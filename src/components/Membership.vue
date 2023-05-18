<template>
  <div class="modal fade" id="signup-modal" data-bs-backdrop="static"
				data-bs-keyboard="false" tabindex="-1"
				aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">
								<i class="bi bi-chat-left-dots-fill text-info">회원가입</i>
							</h4>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>

						<div class="modal-body">
							<form class="sign-form" method="POST" action="member/join">
								<div class="row m-1 mb-3">
									<div class="d-flex justify-content-start ps-0">
										<i class="bi bi-patch-question me-1"></i> <label for="user-id"
											class="form-label">아이디</label>
									</div>
									<input type="text" class="form-control" id="user-id"
										name="user-id" placeholder="아이디" />
								</div>
								<div class="row m-1 mb-3">
									<div class="d-flex justify-content-start ps-0">
										<i class="bi bi-patch-question me-1"></i> <label for="name"
											class="form-label">이름</label>
									</div>
									<input type="text" class="form-control" id="name" name="name"
										placeholder="이름" />
								</div>
								<div class="row m-1 mb-3">
									<div class="d-flex justify-content-start ps-0">
										<i class="bi bi-patch-question me-1"></i> <label
											for="password" class="form-label">비밀번호</label>
									</div>
									<input type="password" class="form-control" id="password"
										placeholder="비밀번호" name="password" />
								</div>
								<div class="row m-1 mb-3">
									<div class="d-flex justify-content-start ps-0">
										<i class="bi bi-patch-question me-1"></i> <label
											for="password-check" class="form-label">비밀번호확인</label>
									</div>
									<input type="password" class="form-control" id="password-check"
										placeholder="비밀번호확인" name="password-check" />
								</div>
								<div class="row m-1 mb-3">
									<div class="d-flex justify-content-start ps-0">
										<i class="bi bi-patch-question me-1"></i> <label for="email"
											class="form-label">이메일</label>
									</div>
									<div class="d-flex justify-content-start ps-0">
										<input type="email" class="form-control" id="email"
											placeholder="이메일" name="email" /> <span class="ms-2 me-2">@</span>
										<select id="domain" class="form-select" name="domain"
											aria-label=".form-select domain">
											<option selected>도메인 선택</option>
											<option value="ssafy.com">ssafy.com</option>
											<option value="gmail.com">gmail.com</option>
											<option value="naver.com">naver.com</option>
										</select>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" id="btn-signup"
								class="btn btn-primary btn-sm">회원가입</button>
							<button type="button" class="btn btn-outline-danger btn-sm"
								data-bs-dismiss="modal">취소</button>
						</div>
					</div>
				</div>
			</div>
</template>

<script>
export default {
  name: 'Membership',
  components: {},
  data() {
    return {
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>