/*********************************************************************
 * Copyright (c) Intel Corporation 2021
 * SPDX-License-Identifier: Apache-2.0
 **********************************************************************/
const ciraFixtures = {
  default: {
    name: 'happyPath',
    format: 'FQDN',
    addr: '192.168.8.50',
    port: '4433',
    username: 'standalone',
    password: 'G@ppm0ym'
  },

  wrong: {
    name: 'asdf -%^7',
    format: 'IPV4',
    ip: '12345',
    port: '3',
    username: 'stand alone',
    password: 'password'
  },

  MpsCertificate: '-----BEGIN CERTIFICATE-----\nMIIEOzCCAqOgAwIBAgIDA5h4MA0GCSqGSIb3DQEBDAUAMD0xFzAVBgNVBAMTDk1Q\nU1Jvb3QtN2ZjN2NhMRAwDgYDVQQKEwd1bmtub3duMRAwDgYDVQQGEwd1bmtub3du\nMCAXDTIwMDExODAxNDAxMloYDzIwNTEwMTE4MDE0MDEyWjA9MRcwFQYDVQQDEw5N\nUFNSb290LTdmYzdjYTEQMA4GA1UEChMHdW5rbm93bjEQMA4GA1UEBhMHdW5rbm93\nbjCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMEOeTOVcOY3bnJ6wLK+\ngc5U/to401ggiWugdqo4y5lfT0zLkM2VGjd2974Pm98OsKZj3cGp7E7t4gjmS5wo\nJzaxJ9HZmsy5radbSW1NYMwCMettnvtknt95uQUxdfO8hi0u2/fgA/CttQYI+87y\nAlQTkNRfkGrD5rCCL0jTpOFiOiM3yM0dLXPmIJs6t84Lyu0mWlLoITdBPBYVFkN6\nmshoK1zXEzkhlT9PiOKkLKeQJfLq8VVv+olv41TfTijyY3HV/Pk+Tn2IXpuC1EdC\nwuuWW1CKmYnM+BmY5h/PwoSMQzGzrjoAL+TDi1RNNIkr6oae95MNo5IMrG/VnFrx\nfKpELGjWr0Y3E2ETiwjt8Ztz2kAflg4OLZ692Kmc6JkP7PZFM2KmxPcHUXE/FmZp\nMPRNKUzc5HBkQD64p3Q1j+RAntqwtz5WzL93K8GEjzdDi2uthP5P+s1WvJnGxEb0\ndRFGyS31eTugIfdGr2zPtMydkYCAGYOyHX3kwMc5tyE6rwIDAQABo0IwQDAMBgNV\nHRMEBTADAQH/MBEGCWCGSAGG+EIBAQQEAwIABzAdBgNVHQ4EFgQUf8fK7M9m+9EH\nFm1yvoOWau391WEwDQYJKoZIhvcNAQEMBQADggGBAE/+K9xaf5Ib+OGGhvyU4NxM\nkQeNsB/7BxEARG8jJ3a1Wr0L0xaABI/7TQzxk+FEwCstm/Z8Qos8GrXtLrEcZONR\nZWLNdTH2itX9eYvx8uPLGP89ILnavivlbQ8DvFnV8EXXOaqz3zzIDzp+HxVumXSG\n/YZWbQjyDCzthD/zuhlvXJca9/pZtqxLkBfT0ZBAGxzpBl82KytF/+LRw/wGBiI2\nqNiHIp2nZUfvpYkBWtRzlVrvLzwlOGpdptkGgrmvjyJ25lllfDOOrizZpIsYVlgQ\nQtulx4EAn1ZuC0jPBxBrYqdkapFdNMY8LC1MMcnX75pfaRaus45WN/ds4JHOfw56\ndkJZs9gmpWSocTeWHL85d1vLVruviQU5pJHUw8QyvLuXRxZef9+8reyoGBnmEVqk\noDOUjCYq53fLPH4czcMsZfh0lWuZc8oSg+rLEfozbSvxBNn2zn7cnFiRWrbFz6hE\ni0IG+SRRxPly82In20v8J4mF1WntTZTYHyuRb/NO7Q==\n-----END CERTIFICATE-----',

  totalCount: 100
}
export { ciraFixtures }
