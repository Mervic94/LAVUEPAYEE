
-- 1) Restrict profiles: remove public-read policy
DROP POLICY IF EXISTS profiles_select_all ON public.profiles;

-- 2) Restrict project_snapshots to admins only
DROP POLICY IF EXISTS snapshots_select_all ON public.project_snapshots;
CREATE POLICY snapshots_select_admin ON public.project_snapshots
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 3) Storage bucket lavuepayee-ads: ownership-based policies
DROP POLICY IF EXISTS ads_public_read ON storage.objects;
DROP POLICY IF EXISTS ads_upload_authenticated ON storage.objects;

-- Public read: keep direct-URL access but restricted listing already addressed by existing "lavuepayee-ads read specific object" policy.

-- INSERT: only campaign owner (path prefix = campaign_id) can upload
CREATE POLICY ads_upload_owner ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'lavuepayee-ads'
    AND EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.advertiser_id = auth.uid()
        AND c.id::text = (storage.foldername(name))[1]
    )
  );

-- UPDATE: only owner
CREATE POLICY ads_update_owner ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'lavuepayee-ads'
    AND EXISTS (
      SELECT 1 FROM public.campaigns c
      WHERE c.advertiser_id = auth.uid()
        AND c.id::text = (storage.foldername(name))[1]
    )
  );

-- DELETE: only owner or admin
CREATE POLICY ads_delete_owner ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'lavuepayee-ads'
    AND (
      public.has_role(auth.uid(), 'admin'::public.app_role)
      OR EXISTS (
        SELECT 1 FROM public.campaigns c
        WHERE c.advertiser_id = auth.uid()
          AND c.id::text = (storage.foldername(name))[1]
      )
    )
  );
