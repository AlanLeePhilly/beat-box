FactoryBot.define do
  factory :user do
    provider 'MyProvider'
    uid 'MyUID'
    first_name 'MyFirstName'
    last_name 'MyLastName'
    email 'MyEmail'
    token 'MyToken'
    refresh_token 'MyRefreshToken'
    oauth_expires_at '2018-12-21 14:40:25'
  end
end
