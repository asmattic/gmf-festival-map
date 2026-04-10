import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';

type Attributes = {
  height: number;
  showLegend: boolean;
  apiBaseUrl: string;
  centerLat: number;
  centerLng: number;
  mapZoom: number;
};

export function Edit({
  attributes,
  setAttributes
}: {
  attributes: Attributes;
  setAttributes: (attrs: Partial<Attributes>) => void;
}) {
  const blockProps = useBlockProps();

  return (
    <>
      <InspectorControls>
        <PanelBody title="Map layout" initialOpen={true}>
          <RangeControl
            label="Height (px)"
            min={320}
            max={1000}
            value={attributes.height}
            onChange={(height: number | undefined) => setAttributes({ height: height ?? 640 })}
          />
          <ToggleControl
            label="Show legend"
            checked={attributes.showLegend}
            onChange={(showLegend: boolean) => setAttributes({ showLegend })}
          />
        </PanelBody>

        <PanelBody title="Map view" initialOpen={true}>
          <TextControl
            label="Center latitude"
            type="number"
            value={String(attributes.centerLat)}
            onChange={(v: string) => setAttributes({ centerLat: parseFloat(v) || 0 })}
            help="Decimal degrees (WGS84), e.g. 27.9514"
          />
          <TextControl
            label="Center longitude"
            type="number"
            value={String(attributes.centerLng)}
            onChange={(v: string) => setAttributes({ centerLng: parseFloat(v) || 0 })}
            help="Decimal degrees (WGS84), e.g. -82.4605"
          />
          <RangeControl
            label="Initial zoom"
            min={12}
            max={19}
            value={attributes.mapZoom}
            onChange={(mapZoom: number | undefined) => setAttributes({ mapZoom: mapZoom ?? 15 })}
          />
        </PanelBody>

        <PanelBody title="Live data" initialOpen={true}>
          <TextControl
            label="API base URL"
            value={attributes.apiBaseUrl}
            onChange={(apiBaseUrl: string) => setAttributes({ apiBaseUrl })}
            help="Origin that serves /api/map/pois, stages, overlay. Leave empty for same-origin."
          />
          <p style={{ fontSize: 12, marginTop: 8 }}>
            The block fetches JSON endpoints: <code>…/api/map/pois</code>,{' '}
            <code>…/api/map/stages</code>, <code>…/api/map/overlay</code> (same contract as the
            Next.js app in this repo).
          </p>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div
          style={{
            minHeight: attributes.height,
            border: '1px dashed #94a3b8',
            padding: 16,
            borderRadius: 8,
            background: '#0f172a',
            color: '#e2e8f0',
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <strong>GMF Festival Map</strong>
          <p style={{ margin: '8px 0 0', opacity: 0.85, fontSize: 14 }}>
            OpenStreetMap + Leaflet on the front end; legend & filters use the Gasparilla map
            shell tokens. Configure data URL and center above.
          </p>
        </div>
      </div>
    </>
  );
}
