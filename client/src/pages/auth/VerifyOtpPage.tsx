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
import { verifyOtp } from "@/lib/api/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { VerifyOtpSchema } from "./contact-schema";

const VerifyOtpPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const email = (location.state as { email: string })?.email;

  const form = useForm<z.infer<typeof VerifyOtpSchema>>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof VerifyOtpSchema>) {
    setIsLoading(true);
    try {
      await verifyOtp(email, values.otp);
      toast({
        title: "OTP verified!",
        description: "You can now reset your password.",
      });
      navigate("/reset-password", { state: { email, otp: values.otp } });
    } catch (error) {
      toast({ title: "Invalid OTP", description: "Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto mb-20 mt-40 flex items-center justify-center">
      <div className="flex flex-col rounded-lg sm:border sm:px-8 sm:py-12">
        <h1 className="text-3xl font-semibold">Verify OTP</h1>
        <p className="mt-2 text-base text-foreground/70">
          Enter the code sent to your email.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex w-full max-w-[400px] flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP (One Time Password)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
          <Toaster />
        </Form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
