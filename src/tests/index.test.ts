const {
    example,
    blockExamples,
    createPoll,
    countButtons,
    countOptions,
} = require('./poll');
const { userId, vote, removeVote } = require('./vote');

/**
 * Test function
 */

test('Create a poll', async () => {
    expect(createPoll(example)).toBe(blockExamples);
});

test('Same amount of buttons as options', async () => {
    expect(countButtons(example)).toBe(countOptions(example));
});

test('User has voted', async () => {
    expect(vote(userId)).toBe(true);
});

test('User removed their vote', async () => {
    expect(removeVote(userId)).toBe(false);
});
