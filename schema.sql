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
    version integer DEFAULT 1
);


--
-- Name: get_latest_campaign(text, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_latest_campaign(p_name text, p_created_by uuid DEFAULT NULL::uuid) RETURNS public.campaigns
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_campaign campaigns;
  v_user_id UUID;
BEGIN
  -- Use provided user or current user
  v_user_id := COALESCE(p_created_by, auth.uid());
  
  SELECT * INTO v_campaign
  FROM campaigns
  WHERE name = p_name 
    AND created_by = v_user_id
  ORDER BY version DESC
  LIMIT 1;
  
  RETURN v_campaign;
END;
$$;


--
-- Name: save_campaign_version(text, text, uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.save_campaign_version(p_name text, p_data text, p_created_by uuid DEFAULT auth.uid()) RETURNS public.campaigns
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
DECLARE
  v_latest_version INT;
  v_new_campaign campaigns;
BEGIN
  -- Get latest version for this user's campaigns
  SELECT COALESCE(MAX(version), 0) 
  INTO v_latest_version
  FROM campaigns 
  WHERE name = p_name AND created_by = p_created_by;

  -- Insert new version
  INSERT INTO campaigns (name, data, version, created_by)
  VALUES (p_name, p_data, v_latest_version + 1, p_created_by)
  RETURNING * INTO v_new_campaign;

  RETURN v_new_campaign;
END;
$$;


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.campaigns (created_at, name, data, created_by, version) FROM stdin;
2025-07-17 16:20:00.02602+00	sequel	H4sIAAAAAAAAE-0dy27jOPJXFjo7vdbTTm4zGCz22NhZYA-LRkDLtM2JLBkSncTdyL8vRNlS8SWReiTOxqfuyHZVqUjWu4q_nBTtsfPgpPjlbzHaHxDZps7MybNsXzgPv9h_Hufl_8jaebj8OXMOCUoxdR6cVYLiJ5pldOfMnDhLsrz88u5YAj3hJMlenJlT7NC6fLBCBYmdt5lTkJ-4_N6r87CcOSfnYfk2cwjFFdJNklVg6OlQ_qz6uwSfbsi2_sa_q08LitI1WiW4RBTjFOcnkS5K9rgQ8L3NnENWEEqy9PzJnH0ynzk_nYd5-Tl6Qaf_oCTxAC0vKEk4UtYkx3EFhf2AoUtKdP8tuUTSilskdX7oUC5llH0xonyfHXPGcoKTNfxP_ZGWmkCkJsEbWlLz9xXeZDn-g1-WVsLKn8qsUCBdilyvkaINxfkQnJ08aOFFRZbfkEWzF5SvC5vFOf9E2ICRydbLyXYnsr7HKjAwEL_p1l-hPCcY4rk8gajQKymcB-dVPmI_nYdQiydo8MQ7lCfVD894Lk8AHhnOgsFZMDiMn6ski58gtexvSGtBT0n5Ccop2ZCYoESg2mPQPAXVgbgXGPRHbwA-DSZXXIfdsdh9Px4OJ4CreQbxwSVWgZaWuAbzGHQBl6GFDJqnghYOJtXTkxrZk1rx1G2g_ZWdCkq47VI_gmTGWUrzLGGi5LIrFZICrpkH4XMbZAiGEOw_hmGdZfmjD6CvRQWpEovZv7Jsf1HivqOTeS48vTktNevvwunin6t2fXxcYQWGAJxbV1jahfG-UWwZKBDCC4tMGQTkNMejQPEGkbg32Vp4pqgu-prDEyrweEAXe43MgYtuK3M0p61iXdiwrlmS5ZAlmYMlEZb63v4UV9Ciaufw0Fy3L7hQZG9gxN4s36KUxII8d10tc4HqWGO0Tk7igYJPVRhphgqKc8U-gQgqCuIsfcYnbvfXjywsFc1uCcA6hG9vzFYp97DL-wiuqY8Qn1A6tYdQcVdQ965r7ghcTNJhxm9jdZpb6S0WqisZC6OZqMqtrLdRh1ijgRUmY09MhUpvFUW8OG8T5rzk9pyZAm273evaSnOFuDE244dJtVe1FS9tvCIha5Juf5fMYviBEunhGD-p7IRvIbBFAMdCq1eRAfvfQlEiFy-ExjtIdPUAAiYpoQQlf2JKSboFJ7z6BUnvyu3gzJx9tiYbwk79Lwe_HnBMz0Jon6VMhJ93858UUSbgUEzJM6J47TzQ_IhnDn7G-W_8w7MIUv1mg5Ki_JyifItp5fY-kX9itH70nB9vKrkxlzhwIE-cD3Z-oLTZNR6sK3p2FQx-N7SALSlSqRtuI3Ahkh7ucHt8RpbLNhEb-3CFLTVtZEUiWSOYpZHWgF8Kx3IS-QIsx_OOBmia09QgetmR8hzX357VqLc5xulv6fo7SUvawPFxspSd2me8xymzVVD8dLfJcmarFBTl9A9RsSukiije-1l5z1kSozRTIHAl_WEXn9FtGBkiH9UwjPn8VMuEpRgkuODwx8YRiCpvSGzmpN6V8G0isCs5XOPty83GZmNe7Di9BF18C5vFPgtnuA4dwlnpC5xBhw33DyR-Oh5gqKB6AMFuyXMJ1skxSWOUp4iB1IZgz3QvmCFONhQAZ3_y1tmBbe1VRmkpyOY6qAt5UwZjb8pIZAu3U1oYU8R5xvTGAW2xyKh_kGKnZVbQMKv2zDzeM_Ou3zOb26do-urcWrUOd9GsrIbxXLV533TCEFdKZaq1ILU2jexwhn3dN9_KffMb-UmPOU2wodw_f7nd7ohLJfVCCmwn3SNRmlXIjHXSlLQFGtr8K6DNk7TAQDu2AqiPZngSG6J3YwMTejqrdS4RFn40YaGGsOCjCVtoc9VjJcglBaR34CdJmVuEH5Wy19zlVGalXJXvI0lfGxPf9rRKPsu7h4d0kZ5zIEgbPVJEguqDUGsFIITBsQJHH4inH28zgcj61TkaC_61JRqbz2v9CqNVDKY2WAWWw22Wgw8r3RZk_AVRL8eSX47ax_B5H8P_ahVifd2PSRJDkrPxIVpqwrou2yqucAK_y2h7jO122SXLxnG7JsiazXtkzYYb6brirm-SuTkwOadBdEk9iU7H4JxW_QbfpHqGaCDoC82RDPq-L3tO6phZAPI8foPGnQ9YBmVGiYsqBgBTb4PydI5OKjHNYfzyjMkduuLcOywB5CEZZbMCyHt23lGC4UFs88aq73K-1wGVZW93OUrX2T453a0J2mYpi8ILLlsXVxtqjEMek9ATcfQMd4Q8fTy82U0Tlee58GxwsPgA9jAsIcRikIHWwQlA6ZNRzrl9e59LXyzSGOvsuN2lR6oKM0kBg57ZqclKPdakQIcDRjnzB345bEcye9nplGhA7izeAW0ko11aojUrhfQvKb7avQl49yYwdW_2aItTiq7SvzEKp3-RWguTgoqJagCvxGkJFf7DEK9hgmSN6DVoYrSwQsW3leUrtNVK8YVGKY6hEuechPP7lvHWu9zEfQMLcQHMKaZObPUOb6_mkerAa2y-DTbzEuVQ9E5rhIENQmlbt1YrwRqI8U0mH-BonKOBXgTc1gwoxQkuSeTqisBD_dl0WZwy-95ho7R0HsyBug15dRteU8XCLZZ4haXwUqwRaMwepotaeRoF3yBiayNFjVcl4qQupFGUttE2Haa0u6oFICv7SyNPJY2kUokWcQilUcRLo-gmjfpII7t_TSTRtW55d8CW_2piqyzg5CwkdUVn0FrRKdl7DKo_ECpsdHNrqMFAqD6A6tVQw4FQPQAVxM7NgkFtDfEG-Z_KWenXxi-1RR2OxU7pWHHPW2G6gDbT2KJCSOpfG-SjRu4k98VWl2FtBKZjJ0Bd-Ccf-CEU4qqsS_OBHyNE8RcdTfaRsMiD2hZeueaErjpRyw6AVoEuFbrDk6sPtuBXmqO7hGz0EZGF8izwow96nYZKtqnc-YiPAdecCiw4pa0ukxTg6LMiPLF-rcbgj4RBO0-DY9HwdxBzG0ZHwzbWXw-7qM39BW_uLz69ua_XZFNMN9Ib1H5fgzrqUaX_tboepk_TaB0yFRWDszPmkR-pAW2EvtdlRwC2wTNsBM99R44fBiGWvFRamkol1mF4lWLJroBuyBGawMdf3Hx8Yx9_MuF07RnjEUSRO-_IcPaQReaI4Awqyyl76rYL_UkEyVWbEhmavbBIMCz60x8GqfKy92AUTQ0jtCnBu9gVeHajmavR2BV72pUzAzRmRTd2KyPVMZlVl5oikcqw3q2p55mk2-8Jopss37e0klxaRXqNhgG9GxJC_oGuyyYSrRsBDiysFBA0_NL01slDDSzaNOG5DScJUA3ISEitYkwOQ5nSowFOP5dx3hSYDp8eVVEdzAwDO7Udes_bofef3jv-vPPf2pLeU_nwoxnMNx9ecigHDYY0zdz4In_fSRNe5BOnADuqgHllyH85PSYJr_ouMlFukuzu5BxL_canFc73KFVrWckIfbde1vfivncV3H8M2vgvWYF8DuQz8_86uK-xMTU2OJ9X-czcZ9vuCvjvt_FfNY4ZLEDPudvKOfDecLjizAdLg9euywRWo4I-R9uuwD5IQQ1uP9PeDmmoDrlM2zvki67c-KE52aw2t6ZhrGu06J3KmYMhyiaoNih4o8_wAXbXtgl05vVdkvXXO8YSnj2Iuyy9K3ZlYWZB78pJeXevp8B6FhGoBALq5GMJ7grt-wqaTSdcTUWzZkxpoGWy6WSlqQjWuYM-z-I6DOEKV1K5_e-kWpP9Hq8_OBYRdWTqP7RNQGtKe1NFSLQhyrFTg0Yct4t0LK8rNWj0hh-VGrTTsbprWlT5elhCFFlZuzohpLyOqNPGbadMuMjEt4cmXT5kcatT9-Ut8yENZ6YhKcgQ4f6ZzqukDHJjo90dxd12Il53clX3nXyerpCv3KN2rbUt5gpMqtP8f1JgqjyyoLEbcSDM2Ha5Idt_IZIYGKLvKArOFMHXXZgLgdHyTKqhSVqRM0L50ArlJQmm_7yHqLEkSU-ZFF79Ookzi5v-aiRi97pJiXTvflRlczwfj521GWNS88ZIt3_I972a3_7RDtODMI1v-2iHGUCYxpc1tMM8N3hcIph1ewd70GoZRqIHPFrnC6SPScgdf_XNIUEnTXiGfbM9uMapLWFsq2s8t_Vmxd6s2JGNAVWho2RgDrNk24tOwJjGsXWnfizOdLpTf4Xjop_Q6rquR0owjhPdUXVJQN5xYWFhUJtrPKntJtBuAu263fJ7Y7fcFw2IKdxyI3dgArdchVcY4NyIA2GQlBt2u-UfJwgUTvk7ioDRHNHprrr61B1jrnhVsCZHK40hGLHi3WwBJ5zPYENA2NPdFQcgLhvnsTP_1tvDD_QePjcYsH1HjTTysatlaIRyYwPTcodxAqeutLqt5Vc7_dYRfWyoIs8aZfSZjR4373_4Zbm6awV0yk-YW-beBpfZ9Z4PsSqlarLPYfveVHUdBjOYNAwtHeaFvr39D6MoMpNQjwAA	2924c962-99f1-4dd2-9b9c-fef832dc991b	1
2025-07-17 16:18:47.843742+00	sequel	H4sIAAAAAAAAE-2XzW7jIBCAX2U1Z6R17CiKfN4nqFbqoVpVxMYJKoYIU6Vu5XevBuIGHLK1myqX-hQQP98wYT6SN5C0ZpCDZIdfBa33lG8lENBK1Q3kb7bxmGCLl5D3XQJ7QSUzkMNG0OLJKGV2QKBQQmmcvHvGTYuW4mbNjpbY3dCGF9ARaPgrw1kvkK8JtJCvOwLcMIeshHKbmHaPy1wfN5cV337M-OtGG0NlSTeCIahgkul2GJXhNWsGvI7AXjXccCWPI4kdSQi8Qp7guGCVuadCeKEcsOtHUnLNCreJnW9pAmkPmCIuXarsJ9W1etY2H5yJ0m8ch_6dR7UeRmXUgeqymRLYcckwE2NyoPl2NykJdoFPGptteqAtgn7TyjD9J7wC_0Xiyst5j-R05e7AiV2GtHJ432I0dadU3VfEAs4pS4-SBifcsEpphkf0mtedNnLKZHjKGP_qZB-vcISfxbL8mF6V5zSS58Uwz5aTjeX0VRtwsgjHVeLKchZdZ6vDffeBHBc_Q479ZfqeIh0jR_J5YZ9d-dsrfESUZ0q_nWQ_E11YBfjOx96RS65LTjXovVJfcFz8wVqOOaEPniy3ODeNcFch90MGaSiDdJbBLINZBj9UBlkog2yWwSyDaTK47Z-964TgPHQJs-x_N3uG-4IMYrIbpYITdLIIYsyYBhLvD4LVQNe9A9Ft5zVfEQAA	8d15b7cc-9c67-4f70-9f4f-743b1a2a8f8e	1
\.


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (name, created_by);


--
-- Name: campaigns_created_by_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX campaigns_created_by_idx ON public.campaigns USING hash (created_by);


--
-- Name: campaigns campaigns_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: campaigns Anyone can insert campaigns; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert campaigns" ON public.campaigns FOR INSERT WITH CHECK (true);


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
-- Name: campaigns Users can view own campaigns; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own campaigns" ON public.campaigns FOR SELECT USING ((auth.uid() = created_by));


--
-- Name: campaigns; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

