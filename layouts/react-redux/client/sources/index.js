
export default process.env.NODE_ENV === 'test'
    ? new Fetcher( require('./vectors') )
    : new Fetcher( 'http://livedata.test' )
