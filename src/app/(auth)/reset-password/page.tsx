
import ResetPassword from "@/components/features/auth/component/ResetPassword";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  );
}
