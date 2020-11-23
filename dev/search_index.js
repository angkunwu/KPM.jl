var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = KPM","category":"page"},{"location":"#KPM","page":"Home","title":"KPM","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [KPM]","category":"page"},{"location":"#KPM.fermiFunction-Tuple{Float64,Float64,Float64}","page":"Home","title":"KPM.fermiFunction","text":"fermiFunction(E, E_f, beta)\n\ncalculate Fermi-Dirac function at energy E, Fermi energy μ and temperature β =1/T. Input and output all Float64. Infinite β only allowed when accessing fermi energy through fermiFunctions(). [For performance reason for now. TODO: allow β=Inf here withouth perf. reduction. ]\n\nAllow sloppy use of type as long as convertion is available, if using keyword arguments. \n\n\n\n\n\n","category":"method"},{"location":"#KPM.fermiFunctions-Tuple{Float64,Float64}","page":"Home","title":"KPM.fermiFunctions","text":"fermiFunctions(E_f::Float64, beta::Float64)\n\nreturns a fermi function with given E_f and beta. \n\nAllow sloppy use of type as long as convertion is available, if using keyword arguments. \n\n\n\n\n\n","category":"method"},{"location":"#KPM.kpm_1d!-Tuple{Any,Int64,Int64,Int64,Any}","page":"Home","title":"KPM.kpm_1d!","text":"kpm_1d!(H, NC, NR, NH, mu; psi_in_l, psi_in_r, verbose)\n\n\nCalculate the moments μ defined in KPM. Output is saved in mu.\n\nFields\n\nH           – Hamiltonian. A matrix or sparse matrix\nNC          – Integer. the cut off dimension\nNR          – Integer. number of random vectors used for KPM evaluation\nNH          – Integer. the size of hamiltonian\nmu          – Array. Output\npsi_in_l    – Array. Input array on the left side. A ket as psi_in_r.\n\nHence, when calculating trace like in DOS, psi_in_l == psi_in_r. \n\npsi_in_r    – Array. Input array on the right side. A ket. Hence for\n\nexample, when calculating trace like in DOS, psi_in_l == psi_in_r. \n\nforce_norm  – Boolean, Optional. Apply normalization.\n\n\n\n\n\n","category":"method"},{"location":"#KPM.kpm_1d-Tuple{Any,Int64,Int64,Int64}","page":"Home","title":"KPM.kpm_1d","text":"kpm_1d(H, NC, NR, NH; psi_in, psi_in_l, psi_in_r, force_norm, verbose)\n\n\nCalculate the moments μ defined in KPM. \n\nFields\n\nH           – Hamiltonian. A matrix or sparse matrix\nNC          – Integer. the cut off dimension\nNR          – Integer. number of random vectors used for KPM evaluation\nNH          – Integer. the size of hamiltonian\npsi_in      – Optional. Allow setting random vector manually.\nforce_norm  – Boolean, Optional. Apply normalization.\nverbose     – Integer. Default is 0. Enables progress bar if set verbose=1.\n\n\n\n\n\n","category":"method"},{"location":"#KPM.kpm_2d!-Tuple{Any,Any,Any,Int64,Int64,Int64,Any}","page":"Home","title":"KPM.kpm_2d!","text":"kpm_2d!(H, Jα, Jβ, NC, NR, NH, μ; arr_size, psi_in_l, psi_in_r, ψ0r, Jψ0r, JTnHJψr, ψall_r, ψ0l, ψall_l, ψw)\n\n\nIn place KPM2D. This is also the main building block for KPM_2D. This method only provide NR=1.\n\nCalculates ψ0l * Tm(H) * Jβ * Tn(H) * Jα * ψ0r. When ψ0r and ψ0l are chosen to be random and identical, the output approximates tr(Tm(H) Jβ Tn(H) Jα). The accuracy is ~ O(1/sqrt(NR * NH)) with NR repetitions. NC controls the energy resolution of the result.\n\nOutput: nothing. Result is saved on μ.\n\nARGS\n\n`H: Hamiltonian. A sparse 2D array.\n`Jα: Current operator. A sparse 2D array.\n`Jβ: Current operator. A sparse 2D array.\n`NC: Integer. KPM cutoff order.\n`NR: Integer. Number of random vectors.\n`NH: Integer. Dimension of H, Jα and Jβ\n`μ: 2D Array of dimension (NC, NC). Results will be updated here. Any data\n\nwill be overwritten.\n\nKWARGS\n\n`arr_size: The buffer array size. Minimum is 3. Determines the number of\n\nleft states to be kept in memory for each loop of right states. The time complexity is reduced from O(NNC^2) to O(NNCarr_size) while space complexity is increased from O(NNC) to O(NNCarr_size).\n\n`psiinl: Passes value to ψ0l. Size is (NH, NR). The array is not updated.\n\nWhether the input is normalized or not, it is assumed to be intended. Usually psiinl should be normalized.\n\n`psiinr: Passes value to ψ0r. Size is (NH, NR). The array is not updated.\n\nWhether the input is normalized or not, it is assumed to be intended. Usually psiinr should be normalized.\n\nworking spaces KWARGS: The following keyword args are simply providing working place arrays to avoid repetitive allocation and GC. They are automatically created if not set. However, when using KPM_2D! for many times, it is beneficial to reuse those arrays.  CONVENTION: args with 'ψ' are all working space arr.\n\nψ0r=maybe_on_device_zeros(NH, NR)\nJψ0r=maybe_on_device_zeros(NH, NR)\nJTnHJψr=maybe_on_device_zeros(NH, NR)\nψall_r=maybe_on_device_zeros(3, NH, NR)\nψ0l=maybe_on_device_zeros(NH, NR)\nψall_l=maybe_on_device_zeros(arr_size, NH, NR)\nψw=maybe_on_device_zeros(NH, NR)\n\n\n\n\n\n","category":"method"},{"location":"#KPM.kpm_2d-Tuple{Any,Any,Any,Int64,Int64,Int64}","page":"Home","title":"KPM.kpm_2d","text":"kpm_2d(H, Ja, Jb, NC, NR, NH; psi_in, psi_in_l, psi_in_r, kwargs...)\n\n\nCalculate moments for 2D KPM. \n\nCalculates ψ0l * Tm(H) * Jβ * Tn(H) * Jα * ψ0r. When ψ0r and ψ0l are chosen to be random and identical, the output approximates tr(Tm(H) Jβ Tn(H) Jα). The accuracy is ~ O(1/sqrt(NR * NH)). NC controls the energy resolution of the result.\n\nOutput: μ, a 2D array in ComplexF64. μ[n, m] is the momentum for 2D KPM.\n\nARGS\n\nH Hamiltonian. A sparse 2D array.\nJα Current operator. A sparse 2D array.\nJβ Current operator. A sparse 2D array.\nNC Integer. KPM cutoff order.\nNR Integer. Number of random vectors to choose from. When skipped, understood as NR=1.\nNH Integer. Dimension of H, Jα and Jβ\n\nKWARGS\n\npsi_in_l\nPasses value to ψ0l. The array is not updated. Size should be (NH, NR) (preferred) or (NR, NH) if set.\npsi_in_r\nPasses value to ψ0r. The array is not updated. Size should be  (NH, NR) (preferred) or (NR, NH) if set.\npsi_in\nCannot be used together with psiinl and psiinr. Sets psiinl=psiinr=psi_in if set.\nkwargs\nother kwargs in KPM_2D!\n\n\n\n\n\n","category":"method"},{"location":"#KPM.sigmaMatricesDot-Tuple{Any}","page":"Home","title":"KPM.sigmaMatricesDot","text":"wi dot σi i correspond to x,y,z and last one is identity examples:     smd3 = sigmaMatricesDot(3)     smd3([1 0 0 0])          ->         2×2 Array{ComplexF64,2}:          0.0+0.0im  1.0+0.0im          1.0+0.0im  0.0+0.0im     smd3([0 1 0 0])         ->         2×2 Array{ComplexF64,2}:          0.0+0.0im  0.0-1.0im          0.0+1.0im  0.0+0.0im     smd3([1 1 1 1])         ->         2×2 Array{ComplexF64,2}:          2.0+0.0im  1.0-1.0im          1.0+1.0im  0.0+0.0im\n\n\n\n\n\n","category":"method"}]
}
