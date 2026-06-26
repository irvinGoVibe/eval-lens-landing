/**
 * Moved to a shared location so production pages can mount the flow field
 * without importing out of `app/dev/`. This module re-exports the shared
 * implementation to keep existing dev imports (CanvasBgAnimSwitch,
 * CanvasFlowEditor) working unchanged.
 */
export {
  CanvasFlowField,
  SCENES,
  classify,
  type Blob,
  type Scene,
} from "@/components/CanvasFlowField";
