import { useAuthenticatedFetch } from "@saleor/app-sdk/app-bridge";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { type WebhooksStatusResponse } from "../pages/api/webhooks-status";

const appBasePath = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "";

export const useWebhooksStatus = () => {
  const fetch: typeof window.fetch = useAuthenticatedFetch();

  const fetchFn = useCallback(() => {
    return fetch(`${appBasePath}/api/webhooks-status`).then((resp) => resp.json());
    /**
     * fetch from SDK is not wrapped with memo todo
     */
  }, []);

  return useQuery<WebhooksStatusResponse>({
    queryKey: ["webhooks-status"],
    queryFn: fetchFn,
  });
};
