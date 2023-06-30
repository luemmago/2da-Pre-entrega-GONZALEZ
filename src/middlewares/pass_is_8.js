function pass_is_8 (res,req,next) {
    const { password } = req.body
    if (password.length >= 8) {
        next()

    }
    return res.status(400).json({
        success: true,
        message: 'la contraseña no puede tener mas de 8 caracteres'

    })
}

export default pass_is_8