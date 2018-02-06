require 'albino'
Dir.foreach('./data/modules/raw') do |item|
  next if item == '.' or item == '..'
  filedetails = item.split('.')
  output = Albino.new(File.new('./raw/' + item), filedetails[1].to_sym).colorize
  File.open('./modules/' + filedetails[0] + '.txt', 'w') do |file|
    file.write(output)
  end
end
