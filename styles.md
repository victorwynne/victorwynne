---
layout: page
permalink: /styles/
title: Styles
---

<p class="notice-guide">
  <small>The style guide serves to document the design of various elements used on this website.</small>
</p>

#### This is a Header

This is the font, size, color and spacing of regular ol' paragraph <p> text. Using Markdown makes it dead simple
to format text *italic*, **bold** or ***bold and italic***.

Regardless of where a link is presented it will always use the same [color](https://www.w3schools.com/html/html_links_colors.asp).

~~The earth is flat.~~

ruby
: *an intense purplish-red color.*
: *an old type size equal to 5 1/2 points.*
: *an open source, interpreted, object-oriented programming language.*

If a sentence contains reference to a footnote a link appears like this[^1].

<figure>
  <img src="/assets/test.png" alt="Testing">
  <figcaption>Here is an image with a caption below it.</figcaption>
</figure>

Blockquote with <mark>citation</mark>:

>"My fellow Americans, we are and always will be a nation of immigrants. We were strangers once, too."
>
><cite>~ Barack Obama</cite>



| This          | Is A          | Table |
| ------------- |:-------------:| -----:|
| Column 1      | happens to be | left-aligned |
| Column 2      | is the one    |  that's centered |
| Column 3      | is actually    |    right-aligned |

<br>

Subscript: H<sub>2</sub>O and Superscript: X<sup>2</sup>

<br>

<p class="tweet">
  <small><b>Tim Cook</b></small> <small><a href="https://twitter.com/tim_cook/status/1497013501193195533?cxt=HHwWmsCsqaH2usYpAAAA">@tim_cook</a></small><br>
  <small>Marking Steve’s birthday never gets any easier. In these challenging times, I’m remembering his call for us to use our time wisely, to pursue excellence, and to leave the world better than we found it. Today would have been his 67th birthday.</small><br>
  <small>12:08 PM • Feb 24, 2022</small>
</p>

<br>

Ordered list:
1. Milk
2. Bread
3. Eggs

Unordered nested list:
- Apple
    - Fuji
    - Gala
    - Macintosh
- Tomato
- Avocado

Task List:
- [x] Make coffee
- [x] Update Homebrew
- [ ] Update all of your gem dependencies
- [x] Drag your feet on updating gem dependencies

<br>

Here are the message boxes with the optional close button enabled:

<p class="green"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><small><b>Success!</b> This is a sentence inside of a message box.</small></p>
<p class="yellow"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><small><b>Caution!</b> This is a sentence inside of a message box.</small></p>
<p class="orange"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><small><b>Warning!</b> This is a sentence inside of a message box.</small></p>
<p class="red"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><small><b>Danger!</b> This is a sentence inside of a message box.</small></p>
<p class="purple"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><small><b>Please Note:</b> This is a sentence inside of a message box.</small></p>
<p class="blue"><span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span><small><b>Information:</b> This is a sentence inside of a message box.</small></p>

<br>

Placing `inline code` within a sentence does not highlight the syntax.

A code block highlights the syntax and displays the language:

{% highlight ruby %}
{% raw %}
Jekyll::Hooks.register(:site, :post_write) do |_site|
  # Temp file to store options. Command line would not accept a series of
  # whitelist classes, and there are a few classes purgecss is missing.
  config_file = 'tmp/purgecss.js'
  # Make sure the tmp directory exists.
  FileUtils.mkdir('tmp') unless Dir.exist?('tmp')
  # Delete existing config file, if it exists.
  File.delete(config_file) if File.exist?(config_file)
  # Configuration JS to write to the file.
  config_text = """module.exports = #{{
    # Wildcard glob of the site's HTML files.
    content: ['_site/**/*.html'],
    # CSS file in the expected output directory.
    css: [Dir.glob('_site/assets/*.css').first],
    # We'll get to this shortly ...
    whitelist: %w(wl-class-1 wl-class-2)
  }.stringify_keys.to_json}"""
  # Write configuration file.
  File.open(config_file, 'w+') { |f| f.write(config_text) }
  # Run purgecss command.
  system("purgecss --config #{config_file} --out _site/assets")
end
{% endraw %}
{% endhighlight %}

***

[^1]: When a footnote is clicked or tapped on it will be highlighted and outlined Wikipedia-style.
