class LettersController < ApplicationController
  def index
    @letters = Letter.all
  end

  def new
    @letter = Letter.new
  end

  def create
    letter = Letter.new(letter_params)
    letter.save!
    redirect_to letters_path, notice: "手紙が送信されました"
  end

  def show
    @letter = Letter.find(params[:id])
  end



  private

  def letter_params
    params.require(:letter).permit(:description, :send_by, :send_to, :api_status)
  end

end
