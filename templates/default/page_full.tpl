{$Comments = $CI->load->module('comments')->init()}
<div id="titleExt">
    <h5>{widget('path')}<span class="ext">{$page.title}</span></h5>
</div>

<div id="detail">
    {$page.prev_text}
</div>

<script type="text/javascript">
    {literal}
        $(function() {
            renderPosts(this);
        })
    {/literal}
</script>

<div id="comment">
    <div id="for_comments" name="for_comments"></div>
</div>
