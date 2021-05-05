#for don't make Heroku sleep
desc "This task is called by the Heroku scheduler add-on"
task :server_startup => :environment do
  puts "Server start..."
  puts Time.now
  puts "done."
end
