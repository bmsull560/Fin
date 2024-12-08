import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import BillingSettings from "./BillingSettings";

const SettingsLayout = () => {
  return (
    <div className="space-y-6 p-10 pb-16 block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      <Separator className="my-6" />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="billing" className="space-y-6">
          <BillingSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsLayout;
