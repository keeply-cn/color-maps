/**
 * 音频服务 - 使用 Web Audio API 生成音效
 * 无需外部音频文件
 */

export class AudioService {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    } catch {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  }

  /**
   * 播放提示音（无解状态）
   */
  playNoSolution(): void {
    if (!this.enabled || !this.audioContext) return;
    
    this.playTone(440, 'sine', 0.3, 0, 0.1);
    setTimeout(() => {
      this.playTone(392, 'sine', 0.3, 0, 0.1);
    }, 150);
  }

  /**
   * 播放胜利音效
   */
  playVictory(): void {
    if (!this.enabled || !this.audioContext) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.2, 0.1, 0.05);
      }, i * 150);
    });
  }

  /**
   * 播放点击音效
   */
  playClick(): void {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(800, 'sine', 0.05, 0, 0.02);
  }

  /**
   * 播放错误音效（冲突）
   */
  playError(): void {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(200, 'sawtooth', 0.15, 0, 0.05);
  }

  /**
   * 播放单个音调
   */
  private playTone(
    frequency: number,
    type: OscillatorType,
    duration: number,
    delay: number = 0,
    decay: number = 0.1
  ): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    const now = this.audioContext.currentTime + delay;
    
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration - decay);
    gainNode.gain.setValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  /**
   * 启用/禁用音效
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * 检查是否启用
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}

// 单例
let audioService: AudioService | null = null;

export function getAudioService(): AudioService {
  if (!audioService) {
    audioService = new AudioService();
  }
  return audioService;
}
