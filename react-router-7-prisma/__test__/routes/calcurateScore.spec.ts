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

test('1フレーム目でストライクを取ったあと、2フレーム目で1本→8本倒すと、1フレーム目の合計スコアは19、2フレーム目の合計スコアは28である', () => {
  const result = displayScoreInfo([
    { firstThrow: 1, secondThrow: 9 },
    { firstThrow: 0, secondThrow: 9 },
  ]).plays;
  const resultTotalScores = result.map(frame => frame.currentTotalScore);

  expect(resultTotalScores[0]).toBe('19');
  expect(resultTotalScores[1]).toBe('28');
});

test('1フレーム目でスペアを取ったあと、2フレーム目で1本→8本倒すと、1フレーム目の合計スコア11は、2フレーム目の合計スコアは20である', () => {
  const result = displayScoreInfo([
    { firstThrow: 1, secondThrow: 9 },
    { firstThrow: 0, secondThrow: 9 },
  ]).plays;
  const resultTotalScores = result.map(frame => frame.currentTotalScore);

  expect(resultTotalScores[0]).toBe('11');
  expect(resultTotalScores[1]).toBe('20');
});
