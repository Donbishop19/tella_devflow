import { redirect } from "next/navigation";

import { auth } from "@/auth";
import ProfileForm from "@/components/forms/ProfileForm";
import ROUTES from "@/constants/routes";
import { getUsers } from "@/lib/actions/user.action";

const Page = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(ROUTES.SIGN_IN);

  const userResult = await getUsers({ userId: session.user.id });

  if (!userResult.success) {
    if (userResult.status === 401 || userResult.status === 403) {
      redirect(ROUTES.SIGN_IN);
    }

    throw new Error(userResult.error?.message || "Failed to load profile");
  }

  const user = userResult.data?.user;

  if (!user) {
    throw new Error("User profile data is unavailable");
  }

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <ProfileForm user={user} />
    </>
  );
};

export default Page;