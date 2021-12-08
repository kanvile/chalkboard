const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user') || 'null')
const userType = user ? user.type : undefined

const currentRoute = window.location.href

const defaultMsg = 'Unauthorized! please sign in first.'
const whiteList = ['index.html', 'admin.html', 'contact.html']

// ensure already sign in
if (whiteList.some((w) => w.indexOf(currentRoute) <= -1) && (!token || !user)) {
  alert(defaultMsg)
  location.replace('/')
}

/* check user type for current route */

// admin only
const adminOnlyRoutes = ['adminView']
checkUserType(userType, currentRoute, adminOnlyRoutes, 'admin', 'Admin only!')

// student only
const studentOnlyRoutes = [
  'enrollclasses.html',
  'search.html',
  'assignment.html',
]
checkUserType(
  userType,
  currentRoute,
  studentOnlyRoutes,
  'student',
  'Student only!'
)

// instructor only
const instructorOnlyRoutes = [
  'dispalyclasses.html',
  'addnewclass.html',
  'grade.html',
]
checkUserType(
  userType,
  currentRoute,
  instructorOnlyRoutes,
  'instruct',
  'Instructor only!'
)

function checkUserType(
  userType,
  currentRoute,
  allowedRoutes,
  correctType,
  errorMsg
) {
  if (allowedRoutes.length === 0) return

  if (
    allowedRoutes.some((r) => currentRoute.indexOf(r) > -1) &&
    userType !== correctType
  ) {
    alert(errorMsg)
    history.back()
  }
}

export {}
