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

if CONFIG["destination"]
  DEST = CONFIG["destination"]
else
  DEST = '_site'
end

begin
  Bundler.setup(:default, :jekyll_plugins, :development)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
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
    answer = stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = stdin(message)
  end
  answer
end

# Transform the filename and date to a slug
# https://github.com/gummesson/jekyll-rake-boilerplate/blob/master/Rakefile#L39
def get_slug(title)
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
  require 'gemoji'

  emoji_dir = CONFIG['source'] + CONFIG['emoji']['src']

  FileUtils.cp_r Emoji.images_path + "/emoji", emoji_dir
  $stderr.puts "All emoji has been generated in " + emoji_dir
end

# @usage: rake new["post","Post title","md"]
desc "Create a new $post in _posts"
task :new, [:type, :title, :ext] do |t, args|
  if args.type
    type = args.type
  else
    type = 'post'
  end

  if args.title
    title = args.title
  else
    title = stdin("Enter a title for your post: ")
  end

  if args.ext
    ext = args.ext
  else
    ext = 'md'
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
      puts "You gave me #{type} -- I have no idea what to do with that."
      exit 1
    end
  end

  date = Time.now.strftime('%Y-%m-%d') + '-' if type == 'post'
  filename = "#{CONFIG['source']}#{path}#{date}#{get_slug(title)}.#{ext}"

  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  tags = stdin("Enter tags to classify your post (comma separated): ")
  puts "Creating new #{type}: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "modified: #{Time.now.strftime('%Y-%m-%d %H:%M:%S %z')}"
    post.puts "thumb:"
    post.puts "comments: "
    post.puts "tags: [#{tags}]"
    post.puts "---"
  end
end

# @usage: rake deploy["Commit message"]
desc "Deploy the site to a remote git repo"
task :deploy, [:message] do |t, args|
  message = args[:message]
  branch = CONFIG["git_branch"]

  if message.nil? or message.empty?
    raise "Please add a commit message."
  end

  if branch.nil? or branch.empty?
    raise "Please add a branch."
  else
    Rake::Task[:build].invoke
    FileUtils.cp '.gitignore', DEST
    Dir.chdir(DEST) do
      system "git add -A"
      system "git commit -m \"#{message}\""
      system "git push origin #{branch}"
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
  system "jekyll serve -w"
end

# @usage: rake build
desc "Build the site"
task :build do
  system "jekyll build"
end

# Set "rake serve" as default task
task :default => :serve
