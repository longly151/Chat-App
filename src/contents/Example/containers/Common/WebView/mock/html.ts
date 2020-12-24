export default `
<p style="font-size:1.3em;">This paragraph is styled a font size set in em !</p>
<em>This one showcases the default renderer for the "em" HTML tag.</em>
<p style="padding:10%;">This one features a padding <strong>in percentage !</strong></p>
<hr />
<i>Here, we have a style set on the "i" tag with the "tagsStyles" prop.</i>
<p>And <a href="http://google.fr" title="Google FR">This is a link !</a></p>
<a href="http://google.fr"><div style="background-color: red; height: 20px; width:40px;"></div></a>
<p class="last-paragraph">Finally, this paragraph is styled through the classesStyles prop</p>
<p>Here is an <em>ul</em> tag</p>
<ul>
    <li>Easy</li>
    <li>Peasy</li>
    <li><div style="background-color:red;width:50px;height:50px;"></div></li>
    <li>Lemon</li>
    <li>Squeezy</li>
</ul>

<br />
<p>Here is an <em>ol</em> tag</p>
<ol>
    <li>Sneaky</li>
    <li>Beaky</li>
    <li>Like</li>
</ol>
<p>This first image's dimensions are set in its style attributes.</p>
<img style="width: 50%; height: 100px; align-self: center;" src="https://i.imgur.com/gSmWCJF.jpg" />
<p>The next image will be sized automatically thanks to the "contentWidth" and "computeImageMaxWidth" props.</p>
<img src="https://i.imgur.com/XP2BE7q.jpg" />
<p>Nested rectangle with percentage dimensions and positionning</p>
<div style="background-color:red;height:200px;">
    <div style="background-color:blue; width:80%; height:80%; top:10%; left:10%"></div>
</div>
<div style="background-color:red; height:200px; padding:20%; margin-top:30px;">
    <p style="color:white">Text inside a rectangle with a 20% padding</p>
</div>
<img src="http://example.tld/image.jpg" />
<p>The following images are not valid.</p>
<p>Styling texts is a very tricky part of converting HTML into react-native components.</p>
<p>The way react-native's <em>Text</em> components behaves is a lot different from our browsers' implementation.</p>
<p>Let's see how styles are applied to texts with this plugin.</p>

<div style="color:red;">This text is inside a div, without a text tag wrapping it. The <em>div</em> tag only has <em>color:red;</em> as style.</div>
<div style="color:red">
    <p>This first paragraph doesn't have a specific styling.</p>
    <p style="color:blue;">This one is blue.</p>
</div>

<p>Here, the <em>div</em> wrapper still has <em>color:red;</em> as style.</div>.</p>

<p>The first paragraph inside it doesn't have any style attribute, either from HTML or from the <em>tagsStyles</em> or <em>classesStyles</em> props.</p>
<p>The second one is set to be blue from its <em>style</em> attribute.</p>

<p>You can see the order of priorities that applies to styling. The less important are your <em>tagsStyles</em>,
then your <em>classessStyles</em> and finally the styles parsed from your HTML content.</p>
<p>Yes you read that right, those damn iframes can render with this plugin.</p>
<p>Check this out</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZZ5LpwO-An4" frameborder="0" allowfullscreen></iframe>
</iframe>
<p style="text-align:center;"><em>We've just rendered a meme</em></p>
`;
