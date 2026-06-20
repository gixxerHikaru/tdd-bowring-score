type Frame = {
  firstThrow: number;
  secondThrow: number;
};

type DisplayFrame = {
  firstThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'G';
  secondThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-';
};

type DisplayScoreInfo = {
  plays: DisplayFrame[];
  totalScore: string;
};

export function displayScoreInfo(frames: Frame[]): DisplayScoreInfo {
  const totalScore = calculateTotalScore(frames).toString();

  const displayPlays: DisplayFrame[] = frames.map(frame => {
    const formatFirstThrow = (value: number): DisplayFrame['firstThrow'] =>
      value === 0 ? 'G' : (value.toString() as DisplayFrame['firstThrow']);
    const formatSecondThrow = (value: number): DisplayFrame['secondThrow'] =>
      value === 0 ? '-' : (value.toString() as DisplayFrame['secondThrow']);

    if (frame.firstThrow === 0 && frame.secondThrow === 0) {
      return { firstThrow: 'G', secondThrow: '-' };
    }
    if (frame.firstThrow === 0) {
      return {
        firstThrow: 'G',
        secondThrow: formatSecondThrow(frame.secondThrow),
      };
    }
    if (frame.secondThrow === 0) {
      return {
        firstThrow: formatFirstThrow(frame.firstThrow),
        secondThrow: '-',
      };
    }
    return {
      firstThrow: formatFirstThrow(frame.firstThrow),
      secondThrow: formatSecondThrow(frame.secondThrow),
    };
  });

  return { plays: displayPlays, totalScore };
}

export default function calculateTotalScore(frames: Frame[]) {
  let totalScore = 0;

  frames.forEach(frame => {
    totalScore += frame.firstThrow + frame.secondThrow;
  });

  return totalScore;
}
