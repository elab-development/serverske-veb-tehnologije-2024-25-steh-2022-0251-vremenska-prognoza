import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { resetPassword } from "@/lib/api/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ResetPasswordSchema } from "./contact-schema";

const ResetPasswordPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { email, otp } =
    (location.state as { email: string; otp: string }) || {};

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    setIsLoading(true);
    try {
      await resetPassword(email, otp, values.password);
      toast({ title: "Success!", description: "Password has been reset." });
      navigate("/log-in");
    } catch (error) {
      toast({ title: "Error", description: "Failed to reset password." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mb-20 mt-40 flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:border sm:px-8 sm:py-12">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
        <p className="mt-2 text-base text-foreground/70">
          Enter your new password below.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex w-full max-w-[400px] flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="At least 8 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
          <Toaster />
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
