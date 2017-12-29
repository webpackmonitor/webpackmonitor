import parser from './parser'
import mockStats from './__mocks__/mock-stats'

const target = '/usr/local/code/webpackmonitor/monitor/stats.json'

describe('utils/parser', () => {
  it('includes the stats meta data in parsed data', () => {
    const { stats } = mockStats()
    const result = parser(stats, target, {})

    expect(stats.time).toEqual(result.time)
    expect(stats.hash).toEqual(result.hash)
    expect(stats.errors).toEqual(result.errors)
  })

  it('includes source maps when excludeSourceMaps is false', () => {
    const { stats, allAssetsSize, allAssetsLength } = mockStats()
    const result = parser(stats, target, { excludeSourceMaps: false })

    expect(result.assets.length).toEqual(allAssetsLength)
    expect(result.size).toEqual(allAssetsSize)
  })

  it('filters out source maps when excludeSourceMaps is true', () => {
    const { stats, sourceAssetsSize, sourceAssetsLength } = mockStats()
    const result = parser(stats, target, { excludeSourceMaps: true })

    expect(result.assets.length).toEqual(sourceAssetsLength)
    expect(result.size).toEqual(sourceAssetsSize)
  })

  it('ensures every chunk has a modules array', () => {
    const { stats } = mockStats()
    const result = parser(stats, target, {})

    result.chunks.forEach(chunk => {
      expect(Array.isArray(chunk.modules)).toBeTruthy()
    })
  })
})
