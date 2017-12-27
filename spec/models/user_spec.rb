require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates or updates itself from an oauth hash' do
    auth = {
      provider: 'google',
      uid: '12345678910',
      info: {
        email: 'test@email.com',
        first_name: 'Test',
        last_name: 'Testerson'
      },
      credentials: {
        token: 'abcdefg12345',
        refresh_token: '12345abcdefg',
        expires_at: DateTime.now
      }
    }
    User.update_or_create(auth)
    new_user = User.first

    expect(new_user.provider).to eq('google')
    expect(new_user.uid).to eq('12345678910')
    expect(new_user.email).to eq('test@email.com')
    expect(new_user.first_name).to eq('Test')
    expect(new_user.last_name).to eq('Testerson')
    expect(new_user.token).to eq('abcdefg12345')
    expect(new_user.refresh_token).to eq('12345abcdefg')
  end
end