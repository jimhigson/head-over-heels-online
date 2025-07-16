import { supabaseDb } from "../../db/supabaseDb";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { cn } from "../../ui/cn";
import { Button } from "../../ui/button";
import { useSupabaseUser } from "./useSupabaseUser";
import type { Provider } from "@supabase/supabase-js";

export const LoggedInStatus = ({ className }: { className?: string }) => {
  const user = useSupabaseUser();

  const handleLogin = (provider: Provider) => async () => {
    const { error } = await supabaseDb.auth.signInWithOAuth({
      provider,
    });
    if (error) console.error("Login error:", error);
  };
  const handleLogout = async () => {
    const { error } = await supabaseDb.auth.signOut();
    if (error) console.error("Logout error:", error);
  };

  return (
    <div className={cn(className)}>
      <div className={cn("px-1", user ? "bg-moss" : "bg-midRed")}>
        {user ?
          <>
            <BitmapText>{`${user.email}`}</BitmapText>
            <BitmapText>{`via ${user.app_metadata.provider}`}</BitmapText>
          </>
        : <>
            <BitmapText className="block w-full sprites-double-height pb-1">
              Not logged in
            </BitmapText>
            <BitmapText className="block w-full text-highlightBeige">
              You will not be able to save
            </BitmapText>
          </>
        }
        <div>
          {user ?
            <Button className="px-1" onClick={handleLogout}>
              <BitmapText>Logout</BitmapText>
            </Button>
          : <div className="pt-1">
              <BitmapText>Log in with:</BitmapText>
              <Button className="px-1" onClick={handleLogin("github")}>
                <BitmapText>GitHub</BitmapText>
              </Button>
              <Button className="px-1" onClick={handleLogin("discord")}>
                <BitmapText>Discord</BitmapText>
              </Button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
