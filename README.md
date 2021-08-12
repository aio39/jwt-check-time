# jwt-check-time

**Simple JWT Decoder**  
This function can determine if the token expiration time & custom time(for reissue tokens) have been exceeded.

## How to use

```ts
import checkJWT from 'jwt-check-time'

const [isNotExpired, isNotOverTime] = checkJWT
      .create({ time: '10m' }) // set config value
      .check(jwt)
```

### Return value

0. isNotExpired  
Check if the token exp time is overed than Date now.
1. isNotOverTime  
Check if the time to reissue the refresh token has overed.  
Criteria time is (token's exp - config time)

## Config Object Property

```ts
// This is the default config value that used if you don't set value
const defaultConfig: config = {
  time: '5m', //  number + unit
  expUnit: 's', // JWT standard time units is second
                // You can set token's time units as  s | m | h | d (regardless of case)
  expName: 'exp', // JWT standard's Expiration Time property name is "exp"
                  // You can customize it to fit your token.
};
```

# Set Default Config

```ts
import checkJWT from 'jwt-check-time'

checkJwt.defaultConfig.time = "5m"
// or 
checkJwt.setConfig = { time: "5m", expUnit: "M" }

// ... in any file
checkJwt.check(jwt) // You can overwrite config with create method
```

The config of create method takes precedence.  
The above setting way affects globally.
