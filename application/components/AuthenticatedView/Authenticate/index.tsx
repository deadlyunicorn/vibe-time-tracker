import { AlertType } from "@/components/AlertListener/interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIdKey } from "@/lib/consts";
import { UserService } from "@/lib/client-service/users";
import { Utils } from "@/lib/utils/index";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Authenticate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            Utils.alertOnError(() =>
              UserService.login({ username, password })
                .then((userId) => {
                  Utils.dispatchAlert({
                    summary: "Login Successful",
                    type: AlertType.Success,
                    description: "You have logged in successfully.",
                  });

                  localStorage.setItem(UserIdKey, String(userId));
                  window.location.reload();
                })
                .finally(() => {
                  setLoading(false);
                })
            );
          }}
          className="space-y-4"
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className={`w-full  ${
                loading ? "cursor-wait" : "cursor-pointer"
              }`}
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
