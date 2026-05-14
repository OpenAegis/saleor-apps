import { useAuthenticatedFetch } from "@saleor/app-sdk/app-bridge";
import { useDashboardNotification } from "@saleor/apps-shared/use-dashboard-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const appBasePath = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "";

export const useWebhooksUpdateMutation = () => {
  const fetch: typeof window.fetch = useAuthenticatedFetch();
  const { notifyError, notifySuccess } = useDashboardNotification();
  const queryClient = useQueryClient();

  const mutationFn = useCallback(() => {
    return fetch(`${appBasePath}/api/recreate-webhooks`, { method: "POST" }).then((resp) => {
      if (resp.ok) {
        queryClient.invalidateQueries({ queryKey: ["webhooks-status"] });
        notifySuccess("Webhooks have been updated");
      } else {
        notifyError("Webhooks update failed");
      }
    });
    /**
     * fetch from SDK is not wrapped with memo todo
     */
  }, [fetch, notifyError, notifySuccess, queryClient]);

  return useMutation({
    mutationFn,
  });
};
