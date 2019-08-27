/*
*   fileName:
*   author: 宋均辉
*   time: 2019/8/20
*/
export default {
    login: `fragment Address on Address {
  id
  firstName
  lastName
  companyName
  streetAddress1
  streetAddress2
  city
  postalCode
  country {
    code
    country
    __typename
  }
  countryArea
  phone
  __typename
}

fragment User on User {
  id
  email
  firstName
  lastName
  isStaff
  defaultShippingAddress {
    ...Address
    __typename
  }
  defaultBillingAddress {
    ...Address
    __typename
  }
  addresses {
    ...Address
    __typename
  }
  __typename
}

mutation TokenAuth($email: String!, $password: String!) {
  tokenCreate(email: $email, password: $password) {
    token
    errors {
      field
      message
      __typename
    }
    user {
      ...User
      __typename
    }
    __typename
  }
}`,
    register:`mutation RegisterCutomer($email: String!, $password: String!) {
  customerRegister(input: {email: $email, password: $password}) {
    errors {
      field
      message
      __typename
    }
    __typename
  }
}`
}