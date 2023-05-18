<template>
	<div class="modal fade" id="signin-modal" data-bs-backdrop="static"
		data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">
						<i class="bi bi-chat-left-dots-fill text-info">로그인</i>
					</h4>
					<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
				</div>

				<div class="modal-body">
					<form class="login-form" method="POST" action="${root}/member/login">
						<div class="row m-1 mb-3">
							<div class="d-flex justify-content-start ps-0">
								<i class="bi bi-patch-question me-1"></i> <label
									for="login-user-id" class="form-label">아이디</label>
							</div>
							<input type="text" class="form-control" id="login-user-id"
								name="login-user-id" placeholder="아이디" />
						</div>
						<div class="row m-1 mb-3">
							<div class="d-flex justify-content-start ps-0">
								<i class="bi bi-patch-question me-1"></i> <label
									for="login-password" class="form-label">비밀번호</label>
							</div>
							<input type="password" class="form-control" id="login-password"
								placeholder="비밀번호" name="login-password" />
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" id="btn-signin"
						class="btn btn-primary btn-sm">로그인</button>
					<button type="button" class="btn btn-outline-danger btn-sm"
						data-bs-dismiss="modal">취소</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'LoginModal',
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