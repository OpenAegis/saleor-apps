import { useAuthenticatedFetch } from "@saleor/app-sdk/app-bridge";
import { useDashboardNotification } from "@saleor/apps-shared/use-dashboard-notification";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

const appBasePath = process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "";

export const useIndicesSetupMutation = () => {
  const fetch: typeof window.fetch = useAuthenticatedFetch();
  const { notifyError, notifySuccess } = useDashboardNotification();

  const mutationFn = useCallback(() => {
    return fetch(`${appBasePath}/api/setup-indices`, { method: "POST" }).then((resp) => {
      if (resp.ok) {
        notifySuccess("Settings have been updated");
      } else {
        notifyError("Settings update failed");
      }
    });
    /**
     * fetch from SDK is not wrapped with memo todo
     */
  }, [fetch, notifyError, notifySuccess]);

  return useMutation({
    mutationFn,
  });
};
