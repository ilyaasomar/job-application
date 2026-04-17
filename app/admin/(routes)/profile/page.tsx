import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { styles } from "@/app/styles";
import { cn } from "@/lib/utils";

import prisma from "@/lib/prisma";
import PersonalInfoForm from "./components/personal-info";
import PasswordForm from "./components/password-form";
import { auth } from "@/lib/auth";
import ProfilePictureForm from "./components/profile-picture-form";

export default async function ProfilePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const userInfo = await prisma.user.findFirst({ where: { id: userId } });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Main layout: Picture + Info */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Picture */}
        {userInfo && (
          <ProfilePictureForm
            userInfo={{
              id: userInfo.id,
              name: userInfo.name,
              image: userInfo.image,
            }}
          />
        )}

        {/* Tabs + Personal Info */}
        <div className="lg:w-2/3 w-full">
          <Tabs defaultValue="personal_info" className="w-full">
            <TabsList
              className={cn(
                `rounded-sm py-6 px-4 ${styles.secondaryBgColor} dark:${styles.secondaryBgColor}, 
                "flex gap-2 overflow-x-auto sm:overflow-x-visible scrollbar-hide"`,
              )}
            >
              <TabsTrigger
                value="personal_info"
                className="p-4 rounded-sm shrink-0"
              >
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="security" className="p-4 rounded-sm shrink-0">
                Security
              </TabsTrigger>
            </TabsList>
            {/* Personal Info Tab */}
            <TabsContent value="personal_info">
              <PersonalInfoForm userInfo={userInfo} />
            </TabsContent>
            {/* Security Tab */}
            <TabsContent value="security">
              <PasswordForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
