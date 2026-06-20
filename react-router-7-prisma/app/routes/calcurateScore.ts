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
    if (frame.firstThrow === 0 && frame.secondThrow === 0) {
      return { firstThrow: 'G', secondThrow: '-' };
    }
    return { firstThrow: frame.firstThrow.toString(), secondThrow: frame.secondThrow.toString() };
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
