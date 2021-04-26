class Letter < ApplicationRecord
  enum api_status: {
      sending: 'sending',
      success: 'success',
      failure: 'failure'
  }
end
