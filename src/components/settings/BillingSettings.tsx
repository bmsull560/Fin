import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth.tsx";
import { CreditCard, Check, Zap } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

type Subscription = {
  id: string;
  tier: "free" | "pro" | "enterprise";
  status: string;
  current_period_end: string;
};

type PaymentMethod = {
  id: string;
  type: string;
  last_four: string;
  expiry_month: number;
  expiry_year: number;
  is_default: boolean;
};

type Invoice = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  invoice_date: string;
};

const plans = [
  {
    name: "Free",
    tier: "free",
    price: "$0",
    description: "Perfect for getting started",
    features: ["10 RSS feeds", "Basic analytics", "7-day article history"],
  },
  {
    name: "Pro",
    tier: "pro",
    price: "$9",
    description: "For power users who need more",
    features: [
      "Unlimited RSS feeds",
      "Advanced analytics",
      "30-day article history",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tier: "enterprise",
    price: "$29",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "Custom integrations",
    ],
  },
];

const BillingSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      setLoading(true);
      const [subData, pmData, invData] = await Promise.all([
        supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user?.id)
          .single(),
        supabase.from("payment_methods").select("*").eq("user_id", user?.id),
        supabase
          .from("invoices")
          .select("*")
          .eq("user_id", user?.id)
          .order("invoice_date", { ascending: false }),
      ]);

      if (subData.data) setSubscription(subData.data);
      if (pmData.data) setPaymentMethods(pmData.data);
      if (invData.data) setInvoices(invData.data);
    } catch (error) {
      console.error("Error loading billing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubscription = async (tier: string) => {
    // In a real app, this would integrate with a payment provider like Stripe
    toast({
      title: "Coming Soon",
      description: "Subscription management will be available soon!",
    });
  };

  const handleAddPaymentMethod = () => {
    // In a real app, this would open a payment method form
    toast({
      title: "Coming Soon",
      description: "Payment method management will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>
      <Separator />

      {/* Current Plan */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Current Plan</h4>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={`p-6 ${plan.tier === subscription?.tier ? "border-primary" : ""}`}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={
                    plan.tier === subscription?.tier ? "outline" : "default"
                  }
                  onClick={() => handleUpdateSubscription(plan.tier)}
                  disabled={loading || plan.tier === subscription?.tier}
                >
                  {plan.tier === subscription?.tier
                    ? "Current Plan"
                    : "Upgrade"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Payment Methods</h4>
          <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium">•••• {method.last_four}</p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expiry_month}/{method.expiry_year}
                    </p>
                  </div>
                </div>
                {method.is_default && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Billing History</h4>
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    ${(invoice.amount / 100).toFixed(2)}{" "}
                    {invoice.currency.toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(invoice.invoice_date), "PPP")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2 py-1 rounded ${invoice.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </span>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
