# == Dependencies ==============================================================

require 'rubygems'
require 'bundler'
require 'rake'
require 'yaml'
# require 'stringex'
# require 'rbconfig'

# == Configuration =============================================================

# Load the configuration file
CONFIG = YAML.load_file("_config.yml")

# Setup default value
GIT_REMOTE = CONFIG['git_remote']  ? CONFIG['git_remote']  : `git config --get remote.origin.url`
GIT_BRANCH = CONFIG['git_branch']  ? CONFIG['git_branch']  : 'master'
DEST_DIR   = CONFIG['destination'] ? CONFIG['destination'] : '_site'
SOURCE_DIR = CONFIG['source']      ? CONFIG['source']      : '.'
EDITOR     = CONFIG['editor']      ? CONFIG['editor']      : ENV['EDITOR']

begin
  Bundler.setup(:default, :jekyll_plugins, :development)
rescue Bundler::BundlerError => e
  puts e.message
  puts "Run `bundle install` to install missing gems"
  exit e.status_code
end

# == Helpers ===================================================================

# https://github.com/mmistakes/hpstr-jekyll-theme/blob/master/Rakefile.rb#L77
def stdin(message)
  print message
  STDIN.gets.chomp
end

# https://github.com/mmistakes/hpstr-jekyll-theme/blob/master/Rakefile.rb#L82
def ask(message, valid_options)
  if valid_options
    options = valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')
    answer  = stdin("#{message} #{options} ") while !valid_options.include?(answer)
  else
    answer  = stdin(message)
  end
  answer
end

def quit(message)
  puts message
  exit 1
end

# Transform the filename and date to a slug
# https://github.com/gummesson/jekyll-rake-boilerplate/blob/master/Rakefile#L39
def getSlug(title)
  characters = /("|'|!|\?|:|\s\z)/
  whitespace = /\s/
  "#{title.gsub(characters,"").gsub(whitespace,"-").downcase}"
end

# remove generated site
def cleanup
  puts 'Cleaned up :)'
  # FileUtils.rm_r 'test', :force => true
end

# == Tasks =====================================================================

# @usage: rake install
desc "Emoji task"
task :install do
  changed = false
  require 'gemoji'

  if !Dir.exist?(DEST_DIR)
    system "git clone #{GIT_REMOTE} -b #{GIT_BRANCH} #{DEST_DIR}"
    changed = true
  end

  emoji_dir = DEST_DIR + CONFIG['emoji']['src'] + '/emoji'

  if !Dir.exist?(emoji_dir)
    FileUtils.cp_r Emoji.images_path + "/emoji/", emoji_dir
    changed = true
  end

  if changed == true
    puts "All emoji has been generated in " + emoji_dir
    puts "You're ready to go sir"
  else
    puts "Everything's ready sir"
  end
end

# @usage: rake new["post","Post title","md"]
desc "Create a new thing"
task :new, [:type, :title, :ext] do |t, args|
  type = args.type  ? args.type  : stdin("Let me know the type sir [post|page|works]: ")

  if type.nil? or type.empty?
    quit "Fine! you silent, i'm quit."
  end

  title = args.title ? args.title : stdin("Give me the #{type} title sir: ")
  ext   = args.ext   ? args.ext   : 'md'

  if title.nil? or title.empty?
    quit "C'mon! you must be have a title. :("
  end

  case type
  when 'post'
    path = '/_posts/'
  when 'page'
    path = '/'
  else
    if CONFIG['collections'].include?("#{type}")
      path = "/#{CONFIG['collections']["#{type}"]['source']}/"
    else
      quit "You ask me to create new '#{type}' that I don't know, sorry."
    end
  end

  date = Time.now.strftime('%Y-%m-%d') + '-' if type == 'post'
  filename = "#{SOURCE_DIR}#{path}#{date}#{getSlug(title)}.#{ext}"

  if File.exist?(filename)
    abort "rake aborted!" if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  tags = stdin("Have an idea what the tags shoud be (comma separated): ")

  open filename, 'w' do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "modified: #{Time.now.strftime('%Y-%m-%d %H:%M:%S %z')}"
    post.puts "thumb:"
    post.puts "comments: "
    post.puts "tags: [#{tags}]"
    post.puts "---"
  end

  puts "new '#{type}' with '#{title}' has been created in #{filename} sir."
  system "#{EDITOR} #{filename}" if ask("Do you want to open it?", ['y', 'n']) != 'n'
end

# @usage: rake build
desc "Build the site"
task :build do
  system "bundle exec jekyll build"
end

# @usage: rake deploy["Commit message"]
desc "Deploy the site to a remote git repo"
task :deploy, [:message] do |t, args|
  # if !args.key?(:message)
  if args[:message].nil? or args[:message].empty?
    message = ENV['CI'] == 'true' ? `git log --oneline -1` : stdin("Please add a commit message: ")
  else
    message = args[:message]
  end

  if GIT_BRANCH.nil? or GIT_BRANCH.empty?
    quit "Please setup your git_branch in _config.yml."
  else
    FileUtils.rm_r DEST_DIR + '/asset', :force => true

    Rake::Task[:build].invoke
    # Rake::Task[:install].invoke

    FileUtils.cp '.gitignore', DEST_DIR

    if ENV['CI'] == 'true'
      system "git config --global user.email \"#{CONFIG['author']}\""
      system "git config --global user.name \"#{CONFIG['email']}\""
      system "bundle exec s3_website push"
    end

    FileUtils.rm_r DEST_DIR + '/asset', :force => true

    Dir.chdir DEST_DIR do
      system "git add -A ."
      system "git commit -m \"#{message}\""
      system "git push origin #{GIT_BRANCH}"
    end
  end
end

# @usage: rake clean
desc 'Clean up generated site'
task :clean do
  cleanup
end

# @usage: rake serve
desc "Build and watch the site"
task :serve do
  system "bundle exec jekyll serve -w"
end

# Set "rake serve" as default task
task :default => :serve
