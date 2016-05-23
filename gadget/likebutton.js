var likeButton = (function() {
    var _return = {
        getLikeCount: _getLikeCount,
        click: _click
    };

    var _APPURL = 'GASのウエブアプリケーションのURL';

    function _click(key) {
        _connection('POST', key);
    }

    function _getLikeCount(key) {
        _connection('GET', key);
    }

    function _connection(method, key) {
        $.ajax({
            url: _APPURL,
            type: method,
            cache: false,
            data: {
                key: key
            },
            timeout: 10000,
            success: function(data) {
                if (data && data.length > 0) {
                    _renderLikeCount(key, data[0].count);
                }
            },
            error: function(data) {
                window.open(_APPURL + '?callback_url=' + encodeURI('google siteのベースURL /callback.html'), 'auth', 'width=500,height=400,resizable=yes');
            },
            complete: function(data) {},
        });
    }

    function _renderLikeCount(key, count) {
        $("." + key).find(".count").text(count);
    }

    return _return;
})();
