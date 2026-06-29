export type Frame = {
  firstThrow: number;
  secondThrow: number;
};

export type FinalFrame = Frame & {
  thirdThrow: number;
};

export type DisplayFrame = {
  firstThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'G' | 'X';
  secondThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | '' | '／';
  currentTotalScore: string;
};

export type FinalDisplayFrame = {
  firstThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'G' | 'X';
  secondThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | 'X' | '／';
  thirdThrow: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '-' | 'X';
  currentTotalScore: string;
};

export type DisplayScoreInfo = {
  plays: (DisplayFrame | FinalDisplayFrame)[];
  totalScore: string;
};

export function displayScoreInfo(frames: Frame[] | FinalFrame[]): DisplayScoreInfo {
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

  const displayPlays: (DisplayFrame | FinalDisplayFrame)[] = frames.map((frame, index) => {
    const formatTotalScore = cumulativeScores[index].toString();

    const formatFirstThrow = (value: number): DisplayFrame['firstThrow'] =>
      value === 0 ? 'G' : (value.toString() as DisplayFrame['firstThrow']);
    const formatSecondThrow = (value: number): DisplayFrame['secondThrow'] =>
      value === 0 ? '-' : (value.toString() as DisplayFrame['secondThrow']);
    if (index === 9) {
      const lastFrame = frames[9] as FinalFrame;
      const formatThirdThrow = (value: number): FinalDisplayFrame['thirdThrow'] =>
        value === 0
          ? '-'
          : value === 10
            ? 'X'
            : (value.toString() as FinalDisplayFrame['thirdThrow']);

      if (frame.firstThrow === 10) {
        return {
          firstThrow: 'X',
          secondThrow: formatSecondThrow(lastFrame.secondThrow),
          thirdThrow: formatThirdThrow(lastFrame.thirdThrow),
          currentTotalScore: formatTotalScore,
        };
      } else if (frame.firstThrow + frame.secondThrow === 10) {
        return {
          firstThrow: formatFirstThrow(frame.firstThrow),
          secondThrow: '／',
          thirdThrow: formatThirdThrow(lastFrame.thirdThrow),
          currentTotalScore: formatTotalScore,
        };
      }
    }

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
