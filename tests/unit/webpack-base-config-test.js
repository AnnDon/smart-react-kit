const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js')

    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/majy/study/smart-react-kit/tests/smoke/demo/src/index/index.js');
        assert.equal(baseConfig.entry.search, '/Users/majy/study/smart-react-kit/tests/smoke/demo/src/search/index.js');
    });
});