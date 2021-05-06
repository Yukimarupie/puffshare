class Letter < ApplicationRecord
  # belongs_to :user

  enum api_status: {
      sending: 'sending',
      success: 'success',
      failure: 'failure'
  }
end
