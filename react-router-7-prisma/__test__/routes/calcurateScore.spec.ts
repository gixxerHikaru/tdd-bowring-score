import { describe } from 'node:test';
import { expect, test } from 'vitest';

import {
  displayScoreInfo,
  type FinalFrame,
  type DisplayFrame,
  type FinalDisplayFrame,
} from '~/routes/calcurateScore';

// ふるまい一覧
// フレームは2投(フレーム内は合計10本まで)
// ただし、1投目で10本倒したら、ストライクとなり、2投目は投げない
// 2投目で合計10本倒していたら、スペアとなる
// ストライクとスペアは特殊なスコア計算が必要となるが、これは後々考える。まずは10フレームの合計スコアを計算することに集中する

test('全ての投球がガターの時、合計スコアは0である', () => {
  const allZeroFrames = [
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
    { firstThrow: 0, secondThrow: 0 },
  ];
  const result = displayScoreInfo(allZeroFrames);

  expect(result).toStrictEqual({
    plays: [
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
      { firstThrow: 'G', secondThrow: '-', currentTotalScore: '0' },
    ],
    totalScore: '0',
  });
});

test('全ての投球が1本の時、合計スコアは20である', () => {
  const allOnesFrames = [
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
    { firstThrow: 1, secondThrow: 1 },
  ];
  const result = displayScoreInfo(allOnesFrames);

  expect(result).toStrictEqual({
    plays: [
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '2' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '4' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '6' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '8' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '10' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '12' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '14' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '16' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '18' },
      { firstThrow: '1', secondThrow: '1', currentTotalScore: '20' },
    ],
    totalScore: '20',
  });
});

test('全ての投球が9本の時、合計スコアは180である', () => {
  const allOnesFrames = [
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
    { firstThrow: 9, secondThrow: 9 },
  ];
  const result = displayScoreInfo(allOnesFrames);

  expect(result).toStrictEqual({
    plays: [
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '18' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '36' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '54' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '72' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '90' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '108' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '126' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '144' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '162' },
      { firstThrow: '9', secondThrow: '9', currentTotalScore: '180' },
    ],
    totalScore: '180',
  });
});

test('1投目もしくは2投目がガターの時、1投目はG、2投目は-である', () => {
  const allZeroFrames = [
    { firstThrow: 0, secondThrow: 1 },
    { firstThrow: 2, secondThrow: 0 },
  ];
  const result = displayScoreInfo(allZeroFrames).plays;
  const resultFirstThrows = result.map(frame => frame.firstThrow);
  const resultSecondThrows = result.map(frame => frame.secondThrow);

  expect(resultFirstThrows[0]).toContain('G');
  expect(resultSecondThrows[0]).toContain('1');
  expect(resultFirstThrows[1]).toContain('2');
  expect(resultSecondThrows[1]).toContain('-');
});

test('1投目が10本の時、1投目はX、2投目はブランクである', () => {
  const result = displayScoreInfo([{ firstThrow: 10, secondThrow: 0 }]).plays;
  const resultFirstThrows = result.map(frame => frame.firstThrow);
  const resultSecondThrows = result.map(frame => frame.secondThrow);

  expect(resultFirstThrows).toContain('X');
  expect(resultSecondThrows).toContain('');
});

test.each([
  { firstThrow: 1, secondThrow: 9 },
  { firstThrow: 2, secondThrow: 8 },
  { firstThrow: 3, secondThrow: 7 },
  { firstThrow: 4, secondThrow: 6 },
  { firstThrow: 5, secondThrow: 5 },
  { firstThrow: 6, secondThrow: 4 },
  { firstThrow: 7, secondThrow: 3 },
  { firstThrow: 8, secondThrow: 2 },
  { firstThrow: 9, secondThrow: 1 },
])('スペアの時、1投目は数字、2投目は／である', frame => {
  const result = displayScoreInfo([frame]).plays;
  const resultFirstThrows = result.map(frame => frame.firstThrow);
  const resultSecondThrows = result.map(frame => frame.secondThrow);

  expect(resultFirstThrows).toContain(frame.firstThrow.toString());
  expect(resultSecondThrows).toContain('／');
});

test('1投目が0本の時にスペアを取ると、1投目はG、2投目は／である', () => {
  const result = displayScoreInfo([{ firstThrow: 0, secondThrow: 10 }]).plays;
  const resultFirstThrows = result.map(frame => frame.firstThrow);
  const resultSecondThrows = result.map(frame => frame.secondThrow);

  expect(resultFirstThrows).toContain('G');
  expect(resultSecondThrows).toContain('／');
});

test.each([
  { firstThrow: 0, secondThrow: 1 },
  { firstThrow: 0, secondThrow: 2 },
  { firstThrow: 0, secondThrow: 3 },
  { firstThrow: 0, secondThrow: 4 },
  { firstThrow: 0, secondThrow: 5 },
  { firstThrow: 0, secondThrow: 6 },
  { firstThrow: 0, secondThrow: 7 },
  { firstThrow: 0, secondThrow: 8 },
  { firstThrow: 0, secondThrow: 9 },
  { firstThrow: 0, secondThrow: 0 },
])(
  'ストライクを取ったあと、次のフレームの投球の合計がボーナスとしてフレームの合計スコアに加算される※ストライク連続は除く',
  secondFrame => {
    const result = displayScoreInfo([{ firstThrow: 10, secondThrow: 0 }, secondFrame]).plays;
    const resultTotalScores = result.map(frame => frame.currentTotalScore);

    const expectedTotalScore = secondFrame.firstThrow + secondFrame.secondThrow + 10;
    expect(resultTotalScores[0]).toBe(expectedTotalScore.toString());
  }
);

test.each([
  { firstThrow: 1, secondThrow: 9 },
  { firstThrow: 2, secondThrow: 8 },
  { firstThrow: 3, secondThrow: 7 },
  { firstThrow: 4, secondThrow: 6 },
  { firstThrow: 5, secondThrow: 5 },
  { firstThrow: 6, secondThrow: 4 },
  { firstThrow: 7, secondThrow: 3 },
  { firstThrow: 8, secondThrow: 2 },
  { firstThrow: 9, secondThrow: 1 },
  { firstThrow: 0, secondThrow: 10 },
])(
  'スペアを取ったあと、次のフレームの最初の投球がボーナスとしてフレームの合計スコアに加算される',
  secondFrame => {
    const result = displayScoreInfo([{ firstThrow: 1, secondThrow: 9 }, secondFrame]).plays;
    const resultTotalScores = result.map(frame => frame.currentTotalScore);

    const expectedTotalScore = secondFrame.firstThrow + 10;
    expect(resultTotalScores[0]).toBe(expectedTotalScore.toString());
  }
);

test('ストライクを連続で取ると、合計スコアは30の倍数になる', () => {
  const result = displayScoreInfo([
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
    { firstThrow: 10, secondThrow: 0 },
  ]).plays;
  const resultTotalScores = result.map(frame => frame.currentTotalScore);

  expect(resultTotalScores[0]).toBe('30');
  expect(resultTotalScores[1]).toBe('60');
  expect(resultTotalScores[2]).toBe('90');
  expect(resultTotalScores[3]).toBe('120');
  expect(resultTotalScores[4]).toBe('150');
  expect(resultTotalScores[5]).toBe('180');
  expect(resultTotalScores[6]).toBe('210');
  expect(resultTotalScores[7]).toBe('230');
});

test('スペアを連続で取り、次のフレームの数が1~9と増えていくと、合計スコアは13から1ずつ増えた合計となる', () => {
  const result = displayScoreInfo([
    { firstThrow: 1, secondThrow: 9 },
    { firstThrow: 2, secondThrow: 8 },
    { firstThrow: 3, secondThrow: 7 },
    { firstThrow: 4, secondThrow: 6 },
    { firstThrow: 5, secondThrow: 5 },
    { firstThrow: 6, secondThrow: 4 },
    { firstThrow: 7, secondThrow: 3 },
    { firstThrow: 8, secondThrow: 2 },
    { firstThrow: 9, secondThrow: 1 },
  ]).plays;
  const resultTotalScores = result.map(frame => frame.currentTotalScore);

  expect(resultTotalScores[0]).toBe('12');
  expect(resultTotalScores[1]).toBe('25');
  expect(resultTotalScores[2]).toBe('39');
  expect(resultTotalScores[3]).toBe('54');
  expect(resultTotalScores[4]).toBe('70');
  expect(resultTotalScores[5]).toBe('87');
  expect(resultTotalScores[6]).toBe('105');
  expect(resultTotalScores[7]).toBe('124');
});

describe('最終フレーム', () => {
  test.each([
    { firstThrow: 10, secondThrow: 0, thirdThrow: 10, expectedThirdThrow: 'X' },
    { firstThrow: 10, secondThrow: 10, thirdThrow: 10, expectedThirdThrow: 'X' },
    { firstThrow: 0, secondThrow: 10, thirdThrow: 10, expectedThirdThrow: 'X' },
    { firstThrow: 1, secondThrow: 9, thirdThrow: 10, expectedThirdThrow: 'X' },
  ])('最終フレームはストライクもしくはスペアを取ると、合計3投、投げられる', input => {
    const allZeroNineFrames = [
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
      { firstThrow: 0, secondThrow: 0 },
    ];

    const finalFrame: FinalFrame = {
      firstThrow: input.firstThrow,
      secondThrow: input.secondThrow,
      thirdThrow: input.thirdThrow,
    };
    const result = displayScoreInfo([...allZeroNineFrames, finalFrame as FinalFrame]).plays as
      | DisplayFrame[]
      | FinalDisplayFrame[];
    const displayFinalFrame = result[9] as FinalDisplayFrame;

    expect(displayFinalFrame.thirdThrow).toBe(input.expectedThirdThrow);
  });
});
