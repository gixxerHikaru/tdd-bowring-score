type Frame = {
  firstThrow: number;
  secondThrow: number;
};

type DisplayFrame = {
  firstThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'G' | 'X';
  secondThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | '' | '／';
  currentTotalScore: string;
};

type DisplayScoreInfo = {
  plays: DisplayFrame[];
  totalScore: string;
};

export function displayScoreInfo(frames: Frame[]): DisplayScoreInfo {
  const totalScore = calculateTotalScore(frames).toString();

  const rawFramseScore = frames.map(frame => frame.firstThrow + frame.secondThrow);
  const framesScore = rawFramseScore.map((score, index) => {
    const nextFrame = frames[index + 1];
    if (nextFrame) {
      if (frames[index].firstThrow === 10) {
        return score + nextFrame.firstThrow + nextFrame.secondThrow;
      } else if (frames[index].firstThrow + frames[index].secondThrow === 10) {
        return score + nextFrame.firstThrow;
      }
    }
    return score;
  });

  let cumulativeScore = 0;
  const cumulativeScores = framesScore.map(score => {
    cumulativeScore += score;
    return cumulativeScore;
  });

  const displayPlays: DisplayFrame[] = frames.map((frame, index) => {
    const formatFirstThrow = (value: number): DisplayFrame['firstThrow'] =>
      value === 0 ? 'G' : (value.toString() as DisplayFrame['firstThrow']);
    const formatSecondThrow = (value: number): DisplayFrame['secondThrow'] =>
      value === 0 ? '-' : (value.toString() as DisplayFrame['secondThrow']);
    const formatTotalScore = cumulativeScores[index].toString();

    if (frame.firstThrow === 10) {
      return { firstThrow: 'X', secondThrow: '', currentTotalScore: formatTotalScore };
    }
    if (frame.firstThrow === 0 && frame.secondThrow === 0) {
      return { firstThrow: 'G', secondThrow: '-', currentTotalScore: formatTotalScore };
    }
    if (frame.firstThrow + frame.secondThrow === 10) {
      return {
        firstThrow: formatFirstThrow(frame.firstThrow),
        secondThrow: '／',
        currentTotalScore: formatTotalScore,
      };
    }
    if (frame.firstThrow === 0) {
      return {
        firstThrow: 'G',
        secondThrow: formatSecondThrow(frame.secondThrow),
        currentTotalScore: formatTotalScore,
      };
    }
    if (frame.secondThrow === 0) {
      return {
        firstThrow: formatFirstThrow(frame.firstThrow),
        secondThrow: '-',
        currentTotalScore: formatTotalScore,
      };
    }
    return {
      firstThrow: formatFirstThrow(frame.firstThrow),
      secondThrow: formatSecondThrow(frame.secondThrow),
      currentTotalScore: formatTotalScore,
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
