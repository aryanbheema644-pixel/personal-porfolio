import type { Scene } from '@/data/scenes';

export interface SceneProps {
  scene: Scene;
  isActive: boolean;
  onOpenSubCard: () => void;
}
