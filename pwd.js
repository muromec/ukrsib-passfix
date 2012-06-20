$(document).ready(function() {

    var $fake = $("#fake_password"),
        $jpw = $("#j_password"),
        $digit = $("#virtualKeyboard span"),
        $form = $("#login"),
        $vkb = $("#virtualKeyboard"),
        $help = $("#virtualKeyboard").prev(),
        digit_codes = {},
        cookie_opts = {
            secure: true
        };

    $fake.removeAttr("readonly");

    $digit.each(function() {
        var num = Number($(this).text()),
            code = $(this).attr("id");

        if(isNaN(num)) {
            return;
        }

        digit_codes[num] = code.replace("digit_", "") + "_";


    })

    var pass_transform = function() {

        var crypted = "";
        $.each($(this).val(), function(idx, el) {
            var num = Number(el);
            if(digit_codes[num] === undefined) {
                return;
            }

            crypted += digit_codes[num];
        });
        $jpw.val(crypted);
    }
    $fake.on("keyup", pass_transform);

    $fake.on("keypress", function(e) {
        if(e.keyCode != 13) {
            return;
        }

        $('input', $form).cookify(cookie_opts);

        $form.submit();
    });

    $("input", $form).removeAttr("autocomplete");
    $('input', $form).cookieFill(cookie_opts);
    pass_transform.apply($fake.get(0));

    $help.text("YA UKRSIB NYA");
    $vkb.hide();

})
