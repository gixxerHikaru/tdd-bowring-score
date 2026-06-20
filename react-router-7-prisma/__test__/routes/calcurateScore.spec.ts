import { expect, test } from 'vitest';
import { displayScoreInfo } from '~/routes/calcurateScore';

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
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
      { firstThrow: 'G', secondThrow: '-' },
    ],
    totalScore: '0',
  });
});

test('1投目もしくは2投目がガターの時、1投目はG、2投目は-である', () => {
  const allZeroFrames = [
    { firstThrow: 0, secondThrow: 1 },
    { firstThrow: 2, secondThrow: 0 },
  ];
  const result = displayScoreInfo(allZeroFrames).plays;

  expect(result).toStrictEqual([
    { firstThrow: 'G', secondThrow: '1' },
    { firstThrow: '2', secondThrow: '-' },
  ]);
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
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
      { firstThrow: '1', secondThrow: '1' },
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
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
      { firstThrow: '9', secondThrow: '9' },
    ],
    totalScore: '180',
  });
});
