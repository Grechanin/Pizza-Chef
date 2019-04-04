def set_sessoin_key(request):
    session_key = request.session.session_key
    if not session_key:
        request.session.cycle_key()
    return locals()