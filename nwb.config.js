module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: false
  },
  webpack:{
    define: {
      'process.env.BASE_URL': JSON.stringify('http://www.sit1.bwoilmarine.com/api')
    },
  }
}
