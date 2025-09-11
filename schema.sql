--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: get_all_users_latest_campaigns(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_all_users_latest_campaigns() RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  result json;
  v_current_user UUID;
BEGIN
  -- Get current user ID
  v_current_user := auth.uid();
  
  WITH latest_campaigns AS (
    -- Get the latest version of each campaign per user
    SELECT DISTINCT ON (created_by, name) 
      name,
      version,
      created_by,
      created_at
    FROM campaigns
    ORDER BY created_by, name, version DESC
  )
  SELECT json_object_agg(
    user_data.user_id,
    user_data.user_json
    ORDER BY 
      CASE WHEN user_data.user_id = v_current_user THEN 0 ELSE 1 END,  -- Current user first
      CASE WHEN user_data.username = 'anon' THEN 2 ELSE 1 END,         -- anon last
      user_data.username  -- then alphabetical
  ) INTO result
  FROM (
    SELECT 
      u.id as user_id,
      COALESCE(ud.username, 'anon') as username,
      json_build_object(
        'user', json_build_object(
          'id', u.id,
          'username', COALESCE(ud.username, 'anon'),
          'isCurrentUser', (u.id = v_current_user)  -- Add boolean flag
        ),
        'campaigns', COALESCE(
          json_object_agg(
            lc.name, 
            json_build_object(
              'name', lc.name,
              'version', lc.version,
              'created_at', lc.created_at
            )
            ORDER BY lc.name
          ) FILTER (WHERE lc.name IS NOT NULL), 
          '{}'::json
        )
      ) as user_json
    FROM auth.users u
    LEFT JOIN user_details ud ON u.id = ud."userId"
    LEFT JOIN latest_campaigns lc ON u.id = lc.created_by
    GROUP BY u.id, ud.username
  ) user_data;
  
  RETURN result;
END;
$$;


--
-- Name: get_all_users_latest_campaigns(boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_all_users_latest_campaigns(p_published_only boolean DEFAULT false) RETURNS json
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  result json;
  v_current_user UUID;
BEGIN
  -- Get current user ID
  v_current_user := auth.uid();
  
  WITH latest_campaigns AS (
    -- Get the latest version of each campaign per user
    SELECT DISTINCT ON (created_by, name) 
      name,
      version,
      created_by,
      created_at
    FROM campaigns
    WHERE 
      -- Filter by published if requested
      CASE 
        WHEN p_published_only THEN published = true
        ELSE true
      END
    ORDER BY created_by, name, version DESC
  ),
  user_data AS (
    SELECT 
      u.id as user_id,
      COALESCE(ud.username, 'anon') as username,
      json_build_object(
        'user', json_build_object(
          'id', u.id,
          'username', COALESCE(ud.username, 'anon'),
          'isCurrentUser', (u.id = v_current_user)
        ),
        'campaigns', COALESCE(
          json_object_agg(
            lc.name, 
            json_build_object(
              'name', lc.name,
              'version', lc.version,
              'created_at', lc.created_at
            )
            ORDER BY lc.name
          ) FILTER (WHERE lc.name IS NOT NULL), 
          '{}'::json
        )
      ) as user_json
    FROM auth.users u
    LEFT JOIN user_details ud ON u.id = ud."userId"
    INNER JOIN latest_campaigns lc ON u.id = lc.created_by  -- Changed to INNER JOIN
    GROUP BY u.id, ud.username
  )
  SELECT json_object_agg(
    user_id,
    user_json
    ORDER BY 
      CASE WHEN user_id = v_current_user THEN 0 ELSE 1 END,
      CASE WHEN username = 'anon' THEN 2 ELSE 1 END,
      username
  ) INTO result
  FROM user_data;
  
  RETURN result;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campaigns (
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    data text NOT NULL,
    created_by uuid DEFAULT auth.uid() NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    published boolean DEFAULT false NOT NULL,
    id integer NOT NULL
);


--
-- Name: get_latest_campaign(text, uuid, integer); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_latest_campaign(p_campaign_name text, p_user_id uuid DEFAULT NULL::uuid, p_version integer DEFAULT NULL::integer) RETURNS public.campaigns
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_campaign campaigns;
  v_user_id UUID;
BEGIN
  -- Use provided user or current user
  v_user_id := COALESCE(p_user_id, auth.uid());
  
  IF p_version IS NULL THEN
    -- Get latest version
    SELECT * INTO v_campaign
    FROM campaigns
    WHERE name = p_campaign_name 
      AND created_by = v_user_id
    ORDER BY version DESC
    LIMIT 1;
  ELSE
    -- Get specific version
    SELECT * INTO v_campaign
    FROM campaigns
    WHERE name = p_campaign_name 
      AND created_by = v_user_id
      AND version = p_version;
  END IF;
  
  RETURN v_campaign;
END;
$$;


--
-- Name: save_campaign_version(text, text, uuid, boolean); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.save_campaign_version(p_name text, p_data text, p_created_by uuid DEFAULT auth.uid(), p_published boolean DEFAULT false) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_latest_version INT;
  v_new_version INT;
BEGIN
  -- Get latest version
  SELECT COALESCE(MAX(version), 0) 
  INTO v_latest_version
  FROM campaigns 
  WHERE name = p_name AND created_by = p_created_by;

  v_new_version := v_latest_version + 1;

  -- Insert new version
  INSERT INTO campaigns (name, data, version, created_by, published)
  VALUES (p_name, p_data, v_new_version, p_created_by, p_published);

  -- Return just the version number
  RETURN v_new_version;
END;
$$;


--
-- Name: campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campaigns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: campaigns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campaigns_id_seq OWNED BY public.campaigns.id;


--
-- Name: user_details; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_details (
    username text NOT NULL,
    "userId" uuid NOT NULL
);


--
-- Name: latest_campaigns_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.latest_campaigns_view AS
 SELECT DISTINCT ON (c.created_by, c.name) c.id,
    c.name,
    c.version,
    c.created_by,
    c.published,
    c.created_at,
    ud.username,
    "left"(c.data, 100) AS data_preview
   FROM (public.campaigns c
     LEFT JOIN public.user_details ud ON ((c.created_by = ud."userId")))
  ORDER BY c.created_by, c.name, c.version DESC;


--
-- Name: campaigns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns ALTER COLUMN id SET DEFAULT nextval('public.campaigns_id_seq'::regclass);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: campaigns campaigns_unique_created_by_name_version; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_unique_created_by_name_version UNIQUE (created_by, name, version);


--
-- Name: user_details user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (username);


--
-- Name: campaigns_created_by_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaigns_created_by_idx ON public.campaigns USING hash (created_by);


--
-- Name: idx_campaigns_created_by_name_version; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_campaigns_created_by_name_version ON public.campaigns USING btree (created_by, name, version);


--
-- Name: campaigns campaigns_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: user_details user_details_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id);


--
-- Name: campaigns Anyone can read campaigns; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can read campaigns" ON public.campaigns FOR SELECT USING (true);


--
-- Name: campaigns Authenticated users can create campaigns; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create campaigns" ON public.campaigns FOR INSERT WITH CHECK ((auth.uid() = created_by));


--
-- Name: campaigns Users can delete own campaigns; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete own campaigns" ON public.campaigns FOR DELETE USING ((auth.uid() = created_by));


--
-- Name: campaigns Users can update own campaigns; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own campaigns" ON public.campaigns FOR UPDATE USING ((auth.uid() = created_by));


--
-- Name: campaigns; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

--
-- Name: user_details; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_details ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

